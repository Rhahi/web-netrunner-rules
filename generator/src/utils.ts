import * as fs from 'fs';
import {Division, TextData, Area} from './types';
import {resolve} from 'path';
import rule from './official';

function replaceIcons(text: string) {
  text = text.replaceAll(
    '[click]',
    '<img class="icon" src="/netrunner/Click.svg" alt="[click]"/>'
  );
  text = text.replaceAll(
    '[1MU]',
    '<img class="icon" src="/netrunner/1MU.svg" alt="[1MU]"/>'
  );
  text = text.replaceAll(
    '[2MU]',
    '<img class="icon" src="/netrunner/2MU.svg" alt="[2MU]"/>'
  );
  text = text.replaceAll(
    '[3MU]',
    '<img class="icon" src="/netrunner/3MU.svg" alt="[3MU]"/>'
  );
  text = text.replaceAll(
    '[c]',
    '<img class="icon" src="/netrunner/Credit.svg" alt="[credit]"/>'
  );
  text = text.replaceAll(
    '[recurring]',
    '<img class="icon" src="/netrunner/recurring credit.svg" alt="[recurring]"/>'
  );
  text = text.replaceAll(
    '[link]',
    '<img class="icon" src="/netrunner/link.svg" alt="[link]"/>'
  );
  text = text.replaceAll(
    '[trash]',
    '<img class="icon" src="/netrunner/Trash.svg" alt="[trash]"/>'
  );
  return text;
}

function replaceLinks(text: string, links?: LinkReplace[]) {
  if (!links) {
    return text;
  }
  for (const link of links) {
    const target = link.link;
    let linkText = link.find;
    if (typeof link.replace === 'string') {
      linkText = link.replace;
    } else if (link.replace === false) {
      linkText = link.find.replace('[[', '').replace(']]', '');
    } else {
      linkText = link.link;
      linkText = linkText.startsWith('#') ? linkText.slice(1) : linkText;
    }
    text = text.replace(link.find, `<a href="${target}">${linkText}</a>`);
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

export function verbatim(args: TextInput | string): TextData {
  if (typeof args === 'string') {
    if (args.startsWith('#')) {
      const ruleText = rule(args);
      if (typeof ruleText !== 'string') {
        console.error(ruleText);
        throw new Error('parse error on ruleText');
      }
      return textc({
        text: ruleText,
        style: 'verbatim',
        id: args,
      });
    }
    return textc({text: args, style: 'verbatim'});
  }
  args.style = 'verbatim';
  return textc(args);
}

export function balanceAreas(areas: Area[]): Division {
  let runnerNeeded = false;
  const stack: Area[] = [];

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
  return {type: 'side-by-side', areas: stack};
}

export function save(dest: string, data: unknown, name: string): void {
  const flattened = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${dest}/${name}.json`, flattened);
  const resultPath = resolve(`${dest}/${name}.json`);
  console.log(`output generated at ${resultPath}`);
}
