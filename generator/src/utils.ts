import * as fs from 'fs';
import {Section, Division, TextData, Area} from './types';
import { resolve } from 'path';

function replaceIcons(text: string) {
  return text;
}

function replaceLinks(text: string, links?: LinkReplace[]) {
  if (!links) {
    return text;
  }
  for (const link of links) {
    if (typeof link.replace === 'string') {
      if (link.find.startsWith('#')) {
        text = text.replace(link.find, `<a href="#${link.link}">${link.replace}</a>`);
      } else {
        text = text.replace(link.find, `<a href="${link.link}">${link.replace}</a>`);
      }
    } else if (link.replace) {
      if (link.find.startsWith('#')) {
        text = text.replace(link.find, `<a href="#${link.link}">${link.link}</a>`);
      } else {
        text = text.replace(link.find, `<a href="${link.link}">${link.link}</a>`);
      }
    }
  }
  return text;
}

interface TextInput {
  id?: string;
  text: string;
  style?: string;
  links?: LinkReplace[];
}

interface LinkReplace {
  find: string;
  replace?: string | boolean;
  link: string;
}

export function plain(text: string): TextData;
export function plain(id_or_text: string, text?: string): TextData {
  if (text) {
    return textc({id: id_or_text, text});
  }
  return textc({text: id_or_text});
}

export function textc(args: TextInput): TextData {
  let text = args.text;
  text = replaceIcons(text);
  text = replaceLinks(text, args.links);
  return {
    id: args.id,
    text: text,
    style: args.style,
  };
}

export function verbatim(text: string): TextData;
export function verbatim(args: TextInput | string): TextData {
  if (typeof args === 'string') {
    return {text: args, style: 'verbatim'};
  }
  args.style = 'verbatim';
  return textc(args);
}

export function balanceAreas(areas: Area[]): Division {
  let runnerNeeded = false;
  let stack: Area[] = [];

  for (const area of areas) {
    if (!runnerNeeded) {
      if (area.side === 'corp') {
        stack.push(area);
        runnerNeeded = true;
        continue;
      }
      if (area.side === 'runner') {
        stack.push({side: 'corp', rules: []});
        stack.push(area);
        runnerNeeded = false;
        continue;
      }
      throw new Error('invalid group');
    }
    if (runnerNeeded) {
      if (area.side === 'corp') {
        stack.push({side: 'runner', rules: []});
        stack.push(area);
        runnerNeeded = true;
        continue;
      }
      if (area.side === 'runner') {
        stack.push(area);
        runnerNeeded = false;
        continue;
      }
      throw new Error('invalid group');
    }
  }
  if (runnerNeeded) {
    stack.push({side: 'runner', rules: []});
  }
  return { type: 'side-by-side', areas: stack };
}

export function save(dest: string, data: unknown, name: string): void {
  const flattened = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${dest}/${name}.json`, flattened);
  const resultPath = resolve(`${dest}/${name}.json`);
  console.log(`output generated at ${resultPath}`);
}
