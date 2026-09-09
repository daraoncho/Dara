import { FRAGMENT_BLUEPRINT, STAGE_SECTION_IDS } from "../constants/fragments";
import { ROBOT_H, ROBOT_W } from "../constants/gameConfig";
import { getSectionMetrics } from "./sectionMetrics";
import { createRng, randomRange } from "./random";

function mkBlock(x, docY, w, overrides = {}) {
  return {
    x,
    docY,
    w,
    isSpawn: false,
    isGoal: false,
    alpha: 0,
    revealed: false,
    ...overrides,
  };
}

function shuffleArray(arr, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function refColumns(playArea) {
  const left = playArea.left + 24;
  const mid = playArea.left + Math.round(playArea.width * 0.32);
  const right = playArea.left + Math.round(Math.min(playArea.width * 0.58, playArea.width - 96));
  return [left, mid, right];
}

/** X tiers for fragment placement — shuffled per layout (ref-style). */
function refXTiers(playArea) {
  const left = playArea.left + 24;
  const cLeft = playArea.left + 90;
  const center = playArea.left + Math.round(playArea.width * 0.48);
  const cRight = playArea.left + Math.round(Math.min(playArea.width * 0.72, playArea.width - 120));
  const farRight = playArea.left + Math.round(Math.min(playArea.width * 0.88, playArea.width - 100));
  return [left, cLeft, center, cRight, farRight];
}

/**
 * Horizontal stepping-stone chain so far-right collectibles stay reachable (ref pattern).
 * Chains run at approachY — below the fragment ledge.
 */
function buildApproachChain(leftAnchor, targetX, approachY, ledges, playArea) {
  if (targetX <= leftAnchor + 80) return;

  let x = leftAnchor;
  let count = 0;
  const farThreshold = playArea.left + playArea.width * 0.72;
  const maxChain = targetX > farThreshold ? 14 : 8;

  while (x + 80 < targetX && count < maxChain) {
    ledges.push(mkBlock(x, approachY, 68));
    x += 90;
    count += 1;
  }
}

/** Vertical zig-zag spine between two document Y anchors. */
function buildVerticalSpine(fromY, toY, cols, scatter, rng, startColIdx = 0) {
  if (toY - fromY < 90) return;

  let y = fromY + 95;
  let colIdx = startColIdx;

  while (y < toY - 75) {
    scatter.push(mkBlock(cols[colIdx % cols.length], y, 68));
    y += randomRange(rng, 100, 128);
    colIdx += 1;
  }
}

/**
 * Build Home → About → Experience → Work with seeded random layout.
 * One fragment per section; approach chains + vertical spine ensure reachability.
 */
export function buildLevel(playArea, seed = 1) {
  const isDesktop = playArea.isDesktop;
  const rng = createRng(seed);
  const cols = refColumns(playArea);
  const leftAnchor = playArea.left + 24;
  const sectionsById = new Map();

  STAGE_SECTION_IDS.forEach((id) => {
    const metrics = getSectionMetrics(id);
    if (metrics) sectionsById.set(id, metrics);
  });

  const home = sectionsById.get("home");
  const origin = home?.top ?? window.scrollY + 80;

  const spawnX = cols[0] + Math.round(randomRange(rng, -4, 8));
  const spawnDocY = origin + (isDesktop ? 175 : 210);

  const spawnBlocks = [
    mkBlock(spawnX, spawnDocY, 80, {
      isSpawn: true,
      spawnIdx: 0,
      alpha: 1,
      revealed: true,
    }),
  ];

  const scatter = [];
  const extraLedges = [];
  const fragments = [];
  const xTiers = shuffleArray(refXTiers(playArea), rng);

  let anchorY = spawnDocY;

  FRAGMENT_BLUEPRINT.forEach((entry, index) => {
    const section = sectionsById.get(entry.sectionId);
    if (!section) return;

    const yMin = section.top + section.height * (isDesktop ? 0.3 : 0.32);
    const yMax = section.top + section.height * (isDesktop ? 0.68 : 0.66);
    const ledgeDocY = randomRange(rng, yMin, yMax);
    const cellX = Math.round(xTiers[index % xTiers.length]);
    const approachY = ledgeDocY + 80;

    buildVerticalSpine(anchorY, approachY - 20, cols, scatter, rng, index);
    buildApproachChain(leftAnchor, cellX, approachY, extraLedges, playArea);

    extraLedges.push(mkBlock(cellX - 8, ledgeDocY, 72));

    fragments.push({
      x: cellX,
      docY: ledgeDocY - 16,
      collected: false,
      sectionId: entry.sectionId,
      kind: "fragment",
    });

    anchorY = ledgeDocY;
  });

  const workSection = sectionsById.get("work");
  if (workSection) {
    const finishLedgeY = workSection.bottom - (isDesktop ? 130 : 150);
    const finishX = Math.round(cols[1] + randomRange(rng, -20, 20));
    const finishApproachY = finishLedgeY + 80;

    buildVerticalSpine(anchorY, finishApproachY - 20, cols, scatter, rng, FRAGMENT_BLUEPRINT.length);
    buildApproachChain(leftAnchor, finishX, finishApproachY, extraLedges, playArea);

    extraLedges.push(
      mkBlock(finishX - 14, finishLedgeY, 96, { isGoal: true, alpha: 0, revealed: false }),
    );

    fragments.push({
      x: finishX,
      docY: finishLedgeY - 16,
      collected: false,
      sectionId: "work",
      kind: "finish",
    });

    anchorY = finishLedgeY;
  }

  const firstSection = sectionsById.get(STAGE_SECTION_IDS[0]);
  const lastSection = sectionsById.get(STAGE_SECTION_IDS[STAGE_SECTION_IDS.length - 1]);

  const stageBounds =
    firstSection && lastSection
      ? {
          top: firstSection.top,
          bottom: lastSection.bottom,
          sectionTop: firstSection.top,
          sectionBottom: lastSection.bottom,
        }
      : null;

  return {
    spawnBlocks,
    scatter,
    extraLedges,
    fragments,
    fragmentTotal: fragments.length,
    robotSpawn: {
      x: Math.round(spawnX + 40 - ROBOT_W / 2),
      docY: spawnDocY - ROBOT_H - 280,
    },
    stageBounds,
  };
}

export function getStageSectionMetrics() {
  return STAGE_SECTION_IDS.map((id) => getSectionMetrics(id)).filter(Boolean);
}
