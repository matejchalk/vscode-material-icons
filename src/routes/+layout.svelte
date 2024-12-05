<script lang="ts">
  import '@picocss/pico/css/pico.css';

  import { goto } from '$app/navigation';
  import { navigating, page } from '$app/stores';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let term = $state($page.url.searchParams.get('q') ?? '');
  let timer: number | undefined;

  function debouncedSearch(event: Event) {
    event.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      goto(`/?q=${term}`, { invalidateAll: true });
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

  input {
    width: 500px;
    max-width: 50vw;
  }

  input::placeholder {
    font-size: 0.9rem;
  }
</style>
