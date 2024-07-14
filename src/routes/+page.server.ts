import { searchIcons } from './search.js';

const imageModules = import.meta.glob('$lib/generated/icons/*.svg', {
  eager: true,
  query: { enhanced: true },
});

export function load({ request }) {
  const term = new URL(request.url).searchParams.get('q');

  return {
    icons: searchIcons(term)
      .map((name) => {
        const module = imageModules[`/src/lib/generated/icons/${name}.svg`];
        if (
          typeof module === 'object' &&
          module !== null &&
          'default' in module &&
          typeof module.default === 'string'
        ) {
          return { name, src: module.default };
        }
        return null;
      })
      .filter((icon) => icon != null),
  };
}
