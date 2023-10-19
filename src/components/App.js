import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import './App.css';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <nav class="topnav">
        <ln><img src="favicon.ico" ></img></ln>
        <ln id="ln2"><a href='#'> CodePen Clone! </a></ln>
        <ln>
          <a id='linkedin' href="https://www.linkedin.com/in/dshivang04/"><img src="linkedin.png"></img></a>
        </ln>
      </nav>

      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}

        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
