<script>
  import Router from "svelte-spa-router";
  import "terminal.css";
  import routes from "./routes";
</script>

<body id="content" class="terminal">
  <div class="container components components-grid" style="margin-top: 1em;">
    <fieldset>
      <legend>The Wash</legend>
      <Router {routes} />
      
    </fieldset>
    <section>
      <p style="font-size: 8px;">
        Created by Elijah Abgao @ {new Date().getFullYear()}; Powered by
        Depression<sup>TM</sup>.
      </p>
    </section>
  </div>
</body>
