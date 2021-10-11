import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
    private cpf: Cpf;
    private coupon: Coupon | undefined;
    private orderItems: OrderItem[];
    private freight: number;
	code: string;
    
    constructor (cpf: string, readonly issueDate: Date = new Date(), readonly sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
		const code = new OrderCode(issueDate, sequence);
		this.code = code.value;
    }

    addItem(item: Item, quantity: number) {
        this.freight += item.getFreight() * quantity;
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    addCoupon (coupon: Coupon) {
        if (coupon.isExpired(this.issueDate)) return;
        this.coupon = coupon;
    }

    getFreight () {
        return this.freight;
    }

	getCpf () {
		return this.cpf.value;
	}

	getCoupon () {
		return this.coupon?.code;
	}

	getOrderItems () {
		return this.orderItems;
	}

    getTotal () {
        let total = 0;
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= (total * this.coupon.percentage) / 100;
        }
        return total;
    }
}
