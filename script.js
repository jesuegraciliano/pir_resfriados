document.getElementById('btnCalcular')
  .addEventListener('click', calculaCargaTermica);

function calculaCargaTermica() {
  // Leitura dos dados
  // Leitura dos dados
  const L       = parseFloat(document.getElementById('largura').value.replace(',', '.'));
  const C       = parseFloat(document.getElementById('comprimento').value.replace(',', '.'));
  const H       = parseFloat(document.getElementById('altura').value.replace(',', '.'));
  const m       = parseFloat(document.getElementById('movimento').value.replace(',', '.'));
  const Te      = parseFloat(document.getElementById('tempExterna').value.replace(',', '.'));
  const Ti      = parseFloat(document.getElementById('tempInterna').value.replace(',', '.'));
  const Tp      = parseFloat(document.getElementById('tempProduto').value.replace(',', '.'));

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
  const fatorInf    = 2.4e-4 * Math.exp(-0.0108 * volume);
  const infiltracao = 1000 * fatorInf * volume * 91;

  // Cálculo da carga térmica total
  const cargaBruta = conducao + produto + motores + pessoas + iluminacao + infiltracao;
  
  // Aplicar fator de segurança de 20%
  const cargaSeguraW = cargaBruta * 1.2;

  // Converter de Watts (W) para kcal/h (dividindo por 1,16)
  const cargaSeguraKcal = cargaSeguraW / 1.16;

  // Exibição dos resultados
  const out = document.getElementById('resultado');
  out.innerHTML = `
    <p><strong>Condução:</strong> ${conducao.toFixed(0)} W</p>
    <p><strong>Produto:</strong> ${produto.toFixed(0)} W</p>
    <p><strong>Motores:</strong> ${motores.toFixed(0)} W</p>
    <p><strong>Pessoas:</strong> ${pessoas} W</p>
    <p><strong>Iluminação:</strong> ${iluminacao.toFixed(0)} W</p>
    <p><strong>Infiltração:</strong> ${infiltracao.toFixed(0)} W</p>
    <p><strong>Carga térmica total (bruta):</strong> ${cargaBruta.toFixed(0)} W</p>
    <p><strong>Carga térmica com 20% de segurança:</strong> ${cargaSeguraW.toFixed(0)} W</p>
    <p><strong>Carga térmica com segurança em kcal/h:</strong> ${cargaSeguraKcal.toFixed(0)} kcal/h</p>
  `;
}
