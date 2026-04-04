function parseVersion(version: string): number[] | null {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    return null;
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareVersions(left: string, right: string): number | null {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);

  if (!leftParts || !rightParts) {
    return null;
  }

  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] > rightParts[index]) return 1;
    if (leftParts[index] < rightParts[index]) return -1;
  }

  return 0;
}

function evaluateSingleRange(version: string, token: string): boolean {
  const trimmed = token.trim();

  if (!trimmed) {
    return false;
  }

  const operators = ['<=', '>=', '<', '>', '='];
  const operator = operators.find((candidate) => trimmed.startsWith(candidate)) ?? '=';
  const targetVersion = trimmed.slice(operator === '=' ? 0 : operator.length).trim();
  const comparison = compareVersions(version, targetVersion);

  if (comparison === null) {
    return false;
  }

  switch (operator) {
    case '<':
      return comparison < 0;
    case '<=':
      return comparison <= 0;
    case '>':
      return comparison > 0;
    case '>=':
      return comparison >= 0;
    case '=':
    default:
      return comparison === 0;
  }
}

export function matchesAffectedRange(version: string, range: string): boolean {
  const normalized = range.trim();

  if (!normalized) {
    return false;
  }

  if (/^\d+\.x$/i.test(normalized)) {
    const major = normalized.split('.')[0];
    return version.startsWith(`${major}.`);
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  return parts.every((part) => evaluateSingleRange(version, part));
}
