export function generateAlzaLink(part: string, model: string): string {
  const searchQuery = encodeURIComponent(`${part} ${model}`);
  return `https://www.alza.sk/search.htm?exps=${searchQuery}`;
}

