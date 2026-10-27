// Texto integral dos 8 cases, reescrito das páginas atuais de ejfgv.com/cases/<slug>/ (baixadas em 26/10/2026):
// condensado em linguagem simples, sem fatos novos. `publicado` é o datePublished dessas páginas (WordPress).
import { SOLUCOES, type Case } from '../../consts';

export interface Resultado {
	titulo: string;
	texto?: string;
	/** dado a confirmar: vira o marcador "A preencher" */
	pendente?: string;
}

export interface ConteudoCase {
	/** completa a frase "Case de <solução> da EJFGV para …" */
	para: string;
	/** subtítulo da página atual: o "spoiler" da capa */
	resumo: string;
	problema: string[];
	solucao: string[];
	resultados: Resultado[];
	publicado?: string;
}

export const CONTEUDO: Record<string, ConteudoCase> = {
	'um-novo-plano-de-negocios-para-uma-empresa-de-audio-consolidada-no-mercado': {
		para: 'uma grande empresa de áudio que voltou para um novo projeto',
		resumo: 'Os clientes, que já tinham fechado um projeto com a EJFGV, voltaram em busca de ajuda para criar um novo negócio.',
		problema: [
			'Os clientes, que fazem parte de uma grande empresa de áudio, procuraram a EJFGV com uma nova ideia de negócio: uma plataforma online para comprar, de forma rápida, “trilhas brancas” de alta qualidade.',
			'O cenário das produtoras de som no Brasil tem vários problemas: um mercado cada vez mais competitivo, com negociações agressivas e prazos curtos; excesso de burocracia para fechar contratos, uma prática que não se sustenta; falta de padrão na precificação; e verbas de marketing definidas ao acaso, o que faz o preço dos serviços variar muito.',
			'A plataforma foi pensada para superar essas dificuldades e simplificar a compra de trilhas.',
		],
		solucao: [
			'Para entender se a ideia era viável e como colocá-la em prática, a equipe usou o modelo “Ideia ao Negócio”, criado por professores da FGV EAESP para construir novos negócios adaptados à realidade brasileira e usado na aceleradora GVentures.',
			'Em fases de Canvas Ideação, Avaliação da Ideia, Business Model Canvas, benchmarks e entrevistas em profundidade, o conceito da plataforma foi aprimorado e direcionado.',
			'Com o público-alvo definido, a concorrência estudada e os diferenciais explorados, o projeto seguiu para o MVP (Mínimo Produto Viável, uma primeira versão do produto para testar a ideia). Nessa fase, nossos consultores deram apoio estratégico aos desenvolvedores.',
		],
		resultados: [
			{ titulo: 'Novo negócio estruturado em 30 dias úteis' },
			{ titulo: 'Economia de milhares de reais', texto: 'Os clientes economizaram milhares de reais com a definição adequada do público-alvo e com as orientações para o desenvolvimento do MVP.' },
		],
		publicado: '2021-04-05',
	},
	'ajudando-o-rica-vida-a-tirar-um-sonho-do-papel': {
		para: 'o Rica Vida, ideia de centros de bem-estar físico e emocional',
		resumo: 'Para estruturar as operações iniciais e analisar a viabilidade do investimento, a EJFGV fez um projeto operacional e financeiro.',
		problema: [
			'O cliente sonhava em criar vários centros de bem-estar físico e emocional que fossem rentáveis e também pudessem financiar um projeto social.',
			'Ele já tinha todo o conhecimento do negócio, mas precisava de ajuda na parte operacional e financeira. Por isso, contratou a EJFGV para estruturar a ideia, estimar quanto capital de investidores seria necessário e precificar os serviços.',
		],
		solucao: [
			'A equipe começou o projeto com benchmarks em estabelecimentos parecidos e pesquisas com o público-alvo. Com esses aprendizados, os consultores usaram metodologias de Gestão de Projetos e Gestão de Operações para consolidar o modelo de negócios.',
			'Depois de levantar opções de imóveis, mapear possíveis funcionários e avaliar diferentes softwares, a equipe passou para a parte financeira: precificação e análise de viabilidade. A partir dos custos e despesas necessários para o funcionamento, os consultores chegaram ao valor de aporte necessário e ao tempo estimado de retorno do investimento. Também precificaram planos diferentes para os clientes do centro de bem-estar, com margem adequada e valor competitivo.',
			'Por fim, os consultores criaram uma planilha para o cliente lançar as transações futuras, que serve de base para demonstrativos financeiros básicos.',
		],
		resultados: [
			{ titulo: 'Projeto implementável e de impacto' },
			{ titulo: 'Cliente satisfeito', texto: 'O projeto recebeu nota 10 no NPS, o índice de satisfação do cliente. Nas palavras de Ricardo, proprietário do Rica Vida: “De 1 a 5, o projeto da EJFGV cumpriu minhas expectativas 7. É muito bem realizado e profissional.”' },
		],
		publicado: '2021-04-05',
	},
	'como-a-confeitaria-ma-cerise-aumentou-em-1124-sua-demanda': {
		para: 'a Confeitaria Ma Cerise, uma confeitaria delivery',
		resumo: 'A Ma Cerise buscou a EJFGV para atrair clientes para a sua confeitaria delivery. Com o plano de marketing elaborado e implementado, o faturamento ficou 10 vezes maior nos 3 meses seguintes ao projeto.',
		problema: [
			'A Ma Cerise estava começando no mundo das confeitarias delivery e ainda tinha dúvidas sobre a melhor estratégia de marketing. O dono e idealizador do negócio queria entender melhor o público-alvo e os seus hábitos de consumo.',
			'Para conhecer e aumentar a base de clientes, ele contratou a EJFGV para criar um plano de marketing.',
		],
		solucao: [
			'A primeira parte do projeto usou pesquisas qualitativas e quantitativas para entender o público-alvo e o seu comportamento de consumo.',
			'Com essas informações, as consultoras montaram estratégias de divulgação nas redes sociais e ajustes no negócio para alcançar o público desejado.',
			'A pandemia chegou durante a implementação das estratégias, mas não afetou o sucesso do projeto: as estratégias foram adaptadas ao contexto da crise, e o projeto virou um grande case de sucesso, com nota 10 no NPS.',
		],
		resultados: [
			{
				titulo: 'Aumento de 1154% na demanda',
				texto: 'Com novas ideias para ampliar e ajustar o cardápio e as novas estratégias de divulgação, a procura pelos doces da Ma Cerise cresceu de forma rápida e exponencial.',
				pendente: 'confirmar percentual (1124% ou 1154%)',
			},
			{ titulo: 'Faturamento 10 vezes maior', texto: 'O aumento da demanda se refletiu direto no faturamento, que cresceu de forma significativa depois do fim do projeto.' },
		],
		publicado: '2021-04-05',
	},
	'como-auxiliamos-a-talent-academy-a-alavancar-sua-area-de-marketing-e-comunicacao': {
		para: 'a Talent Academy, startup de recursos humanos incubada no Cubo Itaú',
		resumo: 'Projeto mercadológico para uma startup de recursos humanos que queria aumentar a sua carteira de clientes.',
		problema: [
			'A Talent Academy é uma HR Tech, startup de tecnologia para recursos humanos, incubada no Cubo Itaú. A empresa oferece serviços de Employee Experience e People Analytics e procurava ajuda para reestruturar as áreas de marketing e comunicação.',
			'O desafio do projeto mercadológico era criar estratégias de prospecção de clientes.',
		],
		solucao: [
			'O projeto começou com uma análise de mercado: o mapeamento dos principais concorrentes da startup e das oportunidades de desenvolvimento. Depois, a equipe fez uma pesquisa qualitativa, com entrevistas em profundidade com áreas de RH de grandes empresas.',
			'A partir dessas etapas, a equipe viu a necessidade de reformular a marca da Talent e de dar a ela um posicionamento mais estratégico, com um rebranding. Junto a isso, traçou estratégias de marketing digital para as redes sociais e o site da empresa, além de explorar como aproveitar melhor o Cubo.',
		],
		resultados: [
			{ titulo: 'Cliente extremamente satisfeito', texto: 'O projeto recebeu nota 10 no NPS. Nas palavras da cliente: “O trabalho de vocês foi essencial para a gente ter alavancado a área de comunicação e marketing da Talent Academy!”' },
			{ titulo: 'Plano de marketing consolidado', texto: 'Estratégias do macro (reposicionamento da marca) ao micro (dicas para posts nas redes sociais), que trouxeram resultado para a startup em crescimento.' },
		],
		publicado: '2021-04-05',
	},
	'como-foi-conduzida-a-reestruturacao-financeira-da-comunik-para-melhores-resultados': {
		para: 'a Comunik, agência de publicidade e propaganda',
		resumo: 'A EJFGV ajudou a agência de comunicação a reestruturar a área financeira, com a criação de planilhas essenciais.',
		problema: [
			'A Comunik é uma agência de publicidade e propaganda que cuida da comunicação dos seus clientes. Quando procurou a EJFGV, a empresa vendia bem o seu portfólio, mas enfrentava dois problemas financeiros.',
			'O primeiro era precificar corretamente os projetos para cada tipo de cliente. O segundo era o prejuízo em que a empresa se encontrava, que pedia uma reestruturação.',
		],
		solucao: [
			'Os consultores criaram uma nova planilha de precificação, que leva em conta todas as variáveis para definir o preço mais justo.',
			'Além disso, identificaram e resolveram os problemas financeiros da empresa: reestruturaram o sistema de bonificação e construíram uma planilha de controle. A Comunik ficou muito satisfeita com o resultado, deu nota 10 no NPS e se tornou um grande case de sucesso.',
		],
		resultados: [
			{ titulo: 'Planilhas financeiras estruturadas', texto: 'Planilhas de precificação e de controle automatizadas e flexíveis para qualquer mudança futura na empresa.' },
			{ titulo: 'Sistema de precificação definido', texto: 'Uma forma nova e justa de precificar os projetos da agência trouxe resultados financeiros mais consistentes e condizentes com as despesas, evitando o prejuízo.' },
		],
		publicado: '2021-04-05',
	},
	'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-na-compra-de-uma-fazenda-de-cafe': {
		para: 'clientes que queriam comprar uma fazenda de café',
		resumo: 'Os consultores buscaram uma alternativa rentável para os clientes depois que a modelagem financeira mostrou que a ideia inicial traria prejuízo.',
		problema: [
			'Os clientes queriam comprar uma fazenda de café, mas precisavam de investidores. Por isso, pediram à EJFGV uma modelagem financeira, para avaliar o retorno do investimento, e um pitch, a apresentação para conquistar os investidores.',
		],
		solucao: [
			'O projeto passou por várias fases para chegar à modelagem financeira e ao pitch para investidores: análise de mercado, benchmarks com especialistas do mercado e alinhamento operacional.',
			'A planilha financeira final trazia a projeção do fluxo de caixa do negócio para os próximos 15 anos, além de alguns indicadores. O resultado foi um valor presente líquido (VPL) negativo: a opção de investimento não era rentável.',
			'Diante dessa conclusão, a equipe elaborou duas alternativas: diferenciar o café ou aumentar o terreno a ser comprado. Os clientes escolheram comprar uma fazenda 10 vezes maior, com VPL estimado de 4 milhões.',
		],
		resultados: [
			{ titulo: 'Economia de milhões de reais para os investidores', texto: 'A análise de viabilidade evitou um prejuízo gigantesco para os investidores e apontou aos clientes uma segunda alternativa, rentável.' },
			{ titulo: 'Clientes satisfeitos', texto: 'O projeto recebeu nota 10 no NPS, e a EJFGV foi procurada de novo para outro projeto.' },
		],
		publicado: '2021-04-05',
	},
	'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-em-um-novo-negocio': {
		para: 'um espaço de eventos renomado no estado de São Paulo',
		resumo: 'Uma análise de viabilidade feita pela EJFGV levou o proprietário de um espaço de eventos a redirecionar um investimento que traria prejuízo de milhões de reais.',
		problema: [
			'Um espaço de eventos renomado, no estado de São Paulo, procurou a EJFGV com uma ideia nova de negócio. O proprietário do imóvel sonhava em expandir para uma nova frente do mercado e queria saber se a ideia tinha potencial de lucro.',
		],
		solucao: [
			'A equipe analisou a viabilidade de mercado da expansão, que dependia de um investimento médio de doze milhões de reais. Com um estudo de mercado, baseado na análise da concorrência e em pesquisas com o público-alvo, os consultores concluíram que a expansão planejada traria prejuízo financeiro ao espaço.',
			'Por isso, propuseram um novo modelo de expansão, com demanda e retorno financeiro, que exigia um investimento 50% menor que o valor inicial planejado. Essa nova ampliação teria payback (o tempo para o investimento se pagar) de sete anos, e o espaço passaria a ter um valor presente líquido de mais de dois milhões de reais.',
		],
		resultados: [
			{ titulo: 'Prejuízo evitado e investimento redirecionado para o lucro', texto: 'A equipe mostrou que a ideia inicial era inviável, evitou um prejuízo de milhões de reais e encontrou um investimento parecido, mas muito lucrativo.' },
			{ titulo: 'Cliente satisfeito', texto: 'Mesmo com a ideia inicial inviável, o cliente ficou satisfeito com a alternativa oferecida pela EJFGV, indicou o nosso serviço para amigos e deu nota 10 no NPS.' },
		],
		publicado: '2021-04-05',
	},
	'por-que-uma-reestruturacao-operacional-e-financeira-foi-essencial-para-a-menezes-e-emidio-advogados': {
		para: 'o escritório Menezes e Emídio Advogados, com foco na área empresarial',
		resumo: 'A EJFGV ajudou o escritório de advocacia a organizar os seus processos e a estruturar a sua fórmula de precificação, aumentando a eficiência e os resultados.',
		problema: [
			'O escritório Menezes e Emídio Advogados atua com foco na área empresarial e personaliza o atendimento a cada cliente. Conta com advogados experientes e com dois sócios especializados em Direito Empresarial, Gestão Tributária, Direito Processual Civil e Direito Digital.',
			'Os sócios advogam há mais de 20 anos e conhecem a fundo as áreas de atuação do escritório, mas pouco de gestão empresarial. Para acelerar o crescimento, contrataram a EJFGV em busca de formas de melhorar a gestão interna de processos, a comunicação e o posicionamento de mercado.',
			'Internamente, o escritório não tinha processos bem estruturados e definidos, um plano de carreira claro para os funcionários nem meios eficazes de comunicação interna. Além disso, a precificação não tinha embasamento técnico, o que deixava o escritório em desvantagem diante dos concorrentes.',
		],
		solucao: [
			'Para organizar os processos internos, a equipe mapeou e redesenhou cada um deles, com responsáveis claros para cada tarefa. Junto com os novos processos, sugeriu mudanças estratégicas e culturais para garantir o crescimento individual, mas complementar, de cada funcionário. E, para o escritório acompanhar continuamente o seu desempenho, recomendou o uso de KPIs: indicadores-chave que medem a efetividade das atividades.',
			'Como o escritório tem grande interesse em usar a tecnologia a favor das operações e busca soluções inovadoras para o dia a dia da equipe, a EJFGV pesquisou concorrentes e especialistas da área para identificar um software que facilitasse a rotina dos advogados. Depois da implementação, também foi definido um sistema especializado em comunicação interna. E, para mostrar com clareza as possibilidades de crescimento no escritório, foi estruturado um plano de carreira para os funcionários, de estagiários até a sociedade.',
			'Por fim, depois de pesquisas com professores especialistas e concorrentes do mercado, foi estruturada uma planilha de precificação automatizada, com 5 modos de precificação, a serem escolhidos conforme o que melhor se adequa a cada caso e cliente.',
		],
		resultados: [
			{ titulo: 'Processos redesenhados e software de comunicação interna', texto: 'Melhor gestão do tempo no escritório e processos bem definidos.' },
			{ titulo: 'Planilha de precificação', texto: 'Melhor posicionamento de marca e mais controle dos gastos do escritório.' },
			{ titulo: 'KPIs', texto: 'Os indicadores-chave de desempenho desenhados no projeto ajudaram a desenvolver a cultura empresarial e a alinhar melhor os colaboradores.' },
		],
		publicado: '2021-04-05',
	},
};

/** Soluções do case, na ordem de `solucoes[]` (a primeira recebe o CTA). */
export const solucoesDo = (c: Case) => c.solucoes.map((slug) => SOLUCOES.find((s) => s.slug === slug)!);

/** Etiqueta do card: segmento · soluções. */
export const tagDo = (c: Case) => [c.segmento, ...solucoesDo(c).map((s) => s.rotulo)].join(' · ');
