import { PdvModule } from "../interfaces/Pdv.interface";

export class ProdutosClienteClass implements PdvModule.ProdutosClienteInterface {
    _id: string
    porcentagem: number
    peso: number
    nome: string
    image: string
    venda: PdvModule.VendaInterface
    ingredientes: PdvModule.IngredienteInteface[]
    descricao: string;

    constructor() {
    }

    static async createInstance(item: PdvModule.ProdutosClienteInterface) {
        const produto = new ProdutosClienteClass;

        produto._id = item._id;
        produto.nome = item.nome;
        produto.peso = item.peso;
        produto.image = item.image;

        const bruto: number = item.venda.bruto || 0;
        const custo: number = item.venda.custo || 0;
        const taxa = 0.27;
        const liquido = bruto * (1 - taxa);
        const lucro = liquido - custo;

        produto.venda = {
            bruto: bruto,
            custo: custo,
            liquido: liquido,
            lucro: lucro,
            taxa: taxa,
        };

        produto.ingredientes = [];
        return produto;
    }

    static async deleteDB({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        }
        try {

            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async dbOne({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async dbAll(): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }


    async InsertDB(data: any): Promise<any> {
        console.log(data)
        async function postData() {
            const response = await fetch("/api/produtos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}