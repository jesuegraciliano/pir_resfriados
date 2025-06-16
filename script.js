function calculaCargaTermica() {
  // Dados de entrada
  const L  = parseFloat(document.getElementById('largura').value);
  const C  = parseFloat(document.getElementById('comprimento').value);
  const H  = parseFloat(document.getElementById('altura').value);
  const Te = parseFloat(document.getElementById('tempExterna').value);
  const Ti = parseFloat(document.getElementById('tempInterna').value);
  const Tp = parseFloat(document.getElementById('tempProduto').value);
  const m = parseFloat(document.getElementById('massa').value);
  
  // Cálculos básicos
  const areaPiso  = L * C;
  const volume    = L * C * H;
  const areaTotal = 2*(L*C + L*H + C*H);
  const fatorinfiltra = 0,0016

  // Parcela Condução térmica (W)
  const U = 0.03 / 0.1;  // 0,126 W/m²·K
  const conducao = U * areaTotal * (Te - Ti);  

  // Parcela Produto (W)
  // Fórmula original: 1000*(ÁreaPiso*3.6*(Ti-Tp))/(16*3600)
  const produto = 1000 * (m * 3.6 * (Tp - Ti)) / (16 * 3600); 

  // Parcela Motores do evaporador (W)
  const motores = 5.6 * L * C * H;  

  // Parcela Pessoas
  const pessoas = 273;  

  // Parcela Iluminação (W)
  const iluminacao = 10 * areaPiso; 

  // Parcela Infiltração (W)
  const infiltracao = 1000 * 0,00016* volume * 91;  

  // Soma bruta e total com fator de segurança
  const cargaBruta = conducao + produto + motores + pessoas + iluminacao + infiltracao;
  const cargaSeg  = cargaBruta;  

  // Verificação dos valores individuais
  console.log('Condução:',   conducao.toFixed(0));
  console.log('Produto:',    produto.toFixed(0));
  console.log('Motores:',    motores.toFixed(0));
  console.log('Pessoas:',    pessoas);
  console.log('Iluminação:', iluminacao.toFixed(0));
  console.log('Infiltração:',infiltracao.toFixed(0));
  console.log('Total (bruto):', cargaBruta.toFixed(0));  

  // Exibição na tela (se quiser mostrar o total bruto)
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
