<script lang="ts">
  import '@picocss/pico/css/pico.css';

  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/stores';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let term = $state($page.url.searchParams.get('q') ?? '');
  let excludeFolders = $state(
    $page.url.searchParams.get('excludeFolders') === 'true',
  );
  let timer: number | undefined;

  function debouncedSearch(event: Event) {
    event.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      const url = new URL(document.location.origin);
      if (term) {
        url.searchParams.append('q', term);
      }
      if (excludeFolders) {
        url.searchParams.append('excludeFolders', 'true');
      }
      goto(url.toString(), {
        invalidateAll: true,
      });
    }, 500);
  }
</script>

<header>
  <nav class="menu">
    <ul>
      <li>
        <h1>
          <a href="https://github.com/matejchalk/vscode-material-icons"
            >VSCode Material Icons</a
          >
          showcase
        </h1>
      </li>
    </ul>
    <ul>
      <li>
        <form method="GET">
          <input
            type="search"
            placeholder="Search by icon name or file pattern"
            name="q"
            bind:value={term}
            onkeyup={debouncedSearch}
            oninput={debouncedSearch}
          />
          <label>
            <input
              type="checkbox"
              name="excludeFolders"
              bind:checked={excludeFolders}
              onkeyup={debouncedSearch}
              oninput={debouncedSearch}
            />
            Exclude folder variations icons
          </label>
        </form>
      </li>
    </ul>
  </nav>
  {#if $navigating}
    <progress id="loading"></progress>
  {/if}
</header>

<main>
  {@render children?.()}
</main>

<style>
  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  input[type='search'] {
    width: 500px;
    max-width: 50vw;
  }

  input::placeholder {
    font-size: 0.9rem;
  }
</style>
