document.getElementById('btnCalcular')
  .addEventListener('click', calculaCargaTermica);

function calculaCargaTermica() {
  // Leitura dos dados
  const L       = parseFloat(document.getElementById('largura').value);
  const C       = parseFloat(document.getElementById('comprimento').value);
  const H       = parseFloat(document.getElementById('altura').value);
  const m       = parseFloat(document.getElementById('movimento').value);
  const Te      = parseFloat(document.getElementById('tempExterna').value);
  const Ti      = parseFloat(document.getElementById('tempInterna').value);
  const Tp      = parseFloat(document.getElementById('tempProduto').value);

  // Cálculos básicos
  const areaPiso  = L * C;
  const volume    = L * C * H;
  const areaTotal = 2 * (L * C + L * H + C * H);

  // Cálculo de cada parcela
  const U           = 0.03 / 0.1; // 0,126 W/m²·K
  const conducao    = U * areaTotal * (Te - Ti);
  const produto     = 1000 * (m * 3.6 * (Tp - Ti)) / (16 * 3600);
  const motores     = 5.6 * L * C * H;
  const pessoas     = 273;
  const iluminacao  = 10 * areaPiso;
  const fatorInf    = 0.00016;
  const infiltracao = 1000 * fatorInf * volume * 91 * (Te - Ti);

  // Soma bruta e exibição
  const cargaBruta = conducao + produto + motores + pessoas + iluminacao + infiltracao;
  const out = document.getElementById('resultado');
  out.innerHTML = `
    <p><strong>Condução:</strong> ${conducao.toFixed(0)} W</p>
    <p><strong>Produto:</strong> ${produto.toFixed(0)} W</p>
    <p><strong>Motores:</strong> ${motores.toFixed(0)} W</p>
    <p><strong>Pessoas:</strong> ${pessoas} W</p>
    <p><strong>Iluminação:</strong> ${iluminacao.toFixed(0)} W</p>
    <p><strong>Infiltração:</strong> ${infiltracao.toFixed(0)} W</p>
    <p><strong><em>Carga térmica total:</em></strong> ${cargaBruta.toFixed(0)} W</p>
  `;
}
