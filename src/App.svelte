<script>
  import {link} from 'svelte-spa-router'
  import Router from 'svelte-spa-router'
  import "../public/base.css"
  import routes from './routes'
</script>

<body id="content">
  <div class="content">
    <div class="control-box close-box"><a class="control-box-inner"></a></div>
    <h1 class="title-dashed">The Wash</h1>
    <Router {routes}/>
  </div>
</body>

<footer class="footer" style="color: #FFFFFF">
  Created by Elijah Abgao @ {new Date().getFullYear()}; Powered by Depression<sup>TM</sup>.
</footer>