const apiAsaas = require('./asaasApi');

async function criarCliente(dados) {
  const payload = {
    name: dados.nome,
    cpfCnpj: dados.cpfCnpj,
    mobilePhone: dados.telefone,
  };
  
  return await apiAsaas.post('/v3/customers', payload);
}

async function criarPagamentoBoleto(dados) {
  

  const payload = {
    billingType: 'BOLETO',
    customer: dados.cliente,
    value: dados.valor,
    dueDate: dados.dataVencimento || new Date().toISOString().split('T')[0],
  };
  console.log(payload);

  try {
    const response = await apiAsaas.post('/payments', payload); 
    return response.data; 
  } catch (error) {
    let errorMessage = error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0].description
        ? error.response.data.errors[0].description
        : error.message;
    console.error('Erro ao criar pagamento:', errorMessage);
	
	
	
	 if (error.response && error.response.data) {
    
    if (error.response.data.errors && error.response.data.errors.length > 0) {
		
      errorMessage = error.response.data.errors[0].description;
    } else {
      
      errorMessage = JSON.stringify(error.response.data);
    }
  } else {
    errorMessage = error.message;
  }
    throw new Error(errorMessage); 
  }
}



async function criarPagamentoPix(dados) {
  const payload = {
    billingType: 'PIX',
    customer: dados.cliente,
    value: dados.valor,
    dueDate: dados.dataVencimento || new Date().toISOString().split('T')[0],
  };
  console.log(payload);

  try {
    const response = await apiAsaas.post('/payments', payload); 
    return response.data; 
  } catch (error) {
    let errorMessage = error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0].description
        ? error.response.data.errors[0].description
        : error.message;
    console.error('Erro ao criar pagamento:', errorMessage);
	
	
	
	 if (error.response && error.response.data) {
    
    if (error.response.data.errors && error.response.data.errors.length > 0) {
		
      errorMessage = error.response.data.errors[0].description;
    } else {
      
      errorMessage = JSON.stringify(error.response.data);
    }
  } else {
    errorMessage = error.message;
  }
    throw new Error(errorMessage); 
  }
}


async function criarPagamentoCartao(dados) {
  const [mes, ano] = dados.creditCard.validade.split('/');

  const payload = {
    billingType: 'CREDIT_CARD',
    customer: dados.cliente,
    value: dados.valor,
    dueDate: dados.dataVencimento || new Date().toISOString().split('T')[0],
    creditCard: {
      holderName: dados.creditCard.nome,
      number: dados.creditCard.numero,
      expiryMonth: mes,
      expiryYear: `20${ano}`,
      ccv: dados.creditCard.codigoSeguranca
    },
    creditCardHolderInfo: {
      name: dados.creditCard.nome,
      cpfCnpj: dados.creditCardHolderInfo.cpfCnpj
    }
  };
  
 

  try {
    const response = await apiAsaas.post('/payments', payload);
   
    return response.data;
  } catch (error) {
    let errorMessage = error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0].description
        ? error.response.data.errors[0].description
        : error.message;
    console.error('Erro ao criar pagamento:', errorMessage);
	
	
	
	 if (error.response && error.response.data) {
    
    if (error.response.data.errors && error.response.data.errors.length > 0) {
		
      errorMessage = error.response.data.errors[0].description;
    } else {
      
      errorMessage = JSON.stringify(error.response.data);
    }
  } else {
    errorMessage = error.message;
  }
    throw new Error(errorMessage); 
  }
}


async function recuperarQrCodePix(paymentId) {
  return await apiAsaas.get(`/payments/${paymentId}/pixQrCode`);
}

module.exports = {
  criarPagamentoBoleto,
  criarPagamentoPix,
  criarPagamentoCartao,
  recuperarQrCodePix
};
