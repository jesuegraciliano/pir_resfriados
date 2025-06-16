function calculaCargaTermica() {
  // Leitura dos dados
  const L = parseFloat(document.getElementById('largura').value);
  const C = parseFloat(document.getElementById('comprimento').value);
  const H = parseFloat(document.getElementById('altura').value);
  const M = parseFloat(document.getElementById('movimento').value);
  const Te = parseFloat(document.getElementById('tempExterna').value);
  const Ti = parseFloat(document.getElementById('tempInterna').value);
  const Tp = parseFloat(document.getElementById('tempProduto').value);

  // Cálculos intermediários
  const areaPiso = L * C;
  const volume = L * C * H;
  const areaTotal = 2 * (L * C + L * H + C * H);
  const U = 0.03 / 0.1; // coeficiente de transmissão térmica
  const condução = U * areaTotal * (Te - Ti);
  const produto = 1000 * (areaPiso * 3.6 * (Ti - Tp)) / (16 * 3600);
  const motores = 5.6 * L * C * H;
  const pessoas = 273;
  const iluminacao = 10 * L * C;
  const infiltracao = 1000 * volume * 91 * (Te - Ti);

  // Soma e fator de segurança
  const cargaBruta = condução + produto + motores + pessoas + iluminacao + infiltracao;
  const cargaSeg = cargaBruta * 1.2;
  const cargaKcal = cargaSeg / 1.16;

  // Exibição do resultado
  const out = document.getElementById('resultado');
  out.innerHTML = `
    <p><strong>Área de piso:</strong> ${areaPiso.toFixed(1)} m²</p>
    <p><strong>Volume da câmara:</strong> ${volume.toFixed(1)} m³</p>
    <p><strong>Área total (paredes, piso e teto):</strong> ${areaTotal.toFixed(1)} m²</p>
    <p><strong>Condução térmica:</strong> ${condução.toFixed(0)} W</p>
    <p><strong>Produto (carga):</strong> ${produto.toFixed(0)} W</p>
    <p><strong>Motores do evaporador:</strong> ${motores.toFixed(0)} W</p>
    <p><strong>Pessoas:</strong> ${pessoas} W</p>
    <p><strong>Iluminação:</strong> ${iluminacao.toFixed(0)} W</p>
    <p><strong>Infiltração:</strong> ${infiltracao.toFixed(0)} W</p>
    <p><strong>Carga térmica total (com 20% de segurança):</strong> ${cargaSeg.toFixed(0)} W</p>
    <p><strong>Carga térmica em kcal/h:</strong> ${cargaKcal.toFixed(0)} kcal/h</p>
  `;
}

// Associação do evento
document.getElementById('btnCalcular').addEventListener('click', calculaCargaTermica);
