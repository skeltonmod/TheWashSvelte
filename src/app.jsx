import { useState } from 'preact/hooks'
import Router from './routes';
import 'terminal.css';

export function App() {
  return (
    <body id="content" class="terminal">
  <div class="container components components-grid" style="margin-top: 1em;">
    <fieldset>
      <legend>The Wash</legend>
      <Router />
      
    </fieldset>
    <section>
      <p style="font-size: 8px;">
        Created by Elijah Abgao @ {new Date().getFullYear()}; Powered by
        Depression<sup>TM</sup>.
      </p>
    </section>
  </div>
</body>

  )
}
