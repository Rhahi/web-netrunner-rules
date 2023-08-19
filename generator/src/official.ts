import * as yaml from 'yaml';
import {resolve} from 'path';
import * as fs from 'fs';

const rules: any[] = [];
const sourcePath = resolve('../rules/data/input');
const files = fs.readdirSync(sourcePath);

for (const path of files) {
  const raw = fs.readFileSync(`${sourcePath}/${path}`, 'utf8');
  const ruleFile = yaml.parse(raw);
  rules.push(ruleFile);
}

function charToNum(char: string) {
  const A = 'a'.charCodeAt(0);
  const code = char.charCodeAt(0) - A;
  if (code < 27 && code >= 0) {
    return code;
  }
  throw new Error('character code out of range');
}

function innerRule(id: string): string {
  if (id.startsWith('#')) {
    id = id.replace('#', '');
  }
  const subIds = id.split('.');
  const chapter = parseInt(subIds[0]);
  if (subIds.length === 1) {
    return rules[chapter].text;
  }
  const v1 = parseInt(subIds[1]) - 1;
  if (subIds.length === 2) {
    return rules[chapter].sections[v1].text;
  }
  const v2 = parseInt(subIds[2]) - 1;
  if (subIds.length === 3) {
    return rules[chapter].sections[v1].rules[v2].text;
  }
  const v3 = charToNum(subIds[3]);
  if (subIds.length === 4) {
    return rules[chapter].sections[v1].rules[v2].rules[v3].text;
  }
  if (!subIds[4].includes('ex')) {
    throw new Error(`unexpected keyword found in ${subIds[4]}`);
  }
  const v4 = parseInt(subIds[4].replace('ex', '')) - 1;
  if (subIds.length === 5) {
    return rules[chapter].sections[v1].rules[v2].rules[v3].examples[v4].text;
  }
  throw new Error(`Rule ${id} not found`);
}

export default function rule(id: string) {
  let text = innerRule(id);
  text = text.replaceAll('{card:', '');
  text = text.replaceAll('{term:', '');
  text = text.replaceAll('}', '');
  if (text.includes('{')) {
    console.warn(`Rule ${id} requires manual cleanup.`);
  }
  return text;
}
