// Web Clínica Yaber: menú del teléfono, borde de la cabecera y aparecer al bajar. Sin librerías.
(function () {
  window.__yaber = true; // si este archivo no carga, el aviso de la cabeza deja todo visible a los 3 s
  var cab = document.getElementById("cabecera");
  var boton = document.querySelector(".boton-menu");
  var menu = document.getElementById("menu");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abrir = boton.getAttribute("aria-expanded") !== "true";
      boton.setAttribute("aria-expanded", String(abrir));
      menu.classList.toggle("abierto", abrir);
      cab.classList.toggle("menu-abierto", abrir);
      document.body.style.overflow = abrir ? "hidden" : "";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && boton.getAttribute("aria-expanded") === "true") boton.click();
    });
  }
  var borde = function () { cab && cab.classList.toggle("con-borde", window.scrollY > 8); };
  window.addEventListener("scroll", borde, { passive: true }); borde();

  var items = document.querySelectorAll(".aparece, .fila");
  if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("visible"); }); return; }
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
