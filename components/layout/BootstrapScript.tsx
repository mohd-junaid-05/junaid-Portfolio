/**
 * Tiny pre-paint inline bootstrap so theme preference, reduced-motion state,
 * `html.js` flag, and cold-visit `data-loading` attribute apply before first paint,
 * preventing unstyled hero flashes or stuck preloaders.
 */
const BOOTSTRAP_CODE = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('mj-theme');if(t==='blood'||t==='aged'||t==='indigo'||t==='moss')d.setAttribute('data-theme',t);var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var ov=sessionStorage.getItem('mj-motion-override');var m=ov==='on'||ov==='off'?ov:(rm?'off':'on');d.setAttribute('data-motion',m);if(m==='on'&&!sessionStorage.getItem('mj-seen'))d.setAttribute('data-loading','');}catch(e){}})();`;

export function BootstrapScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP_CODE }} />;
}
