import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";


test("Não deve criar um pedido com CPF inválido", function () {
    expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido", function () {
    const order = new Order("847.903.332-05");
    expect(order).toBeDefined();
});

test("Deve criar um pedido com 3 itens", function () {
    const order = new Order("847.903.332-05");
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
    const order = new Order("847.903.332-05");
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(4872);
});

test("Deve criar um pedido com 3 itens com cupom de desconto expirado", function () {
    const order = new Order("847.903.332-05", new Date("2021-10-10"));
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01")));
    const total = order.getTotal();
    expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens", function () {
    const order = new Order("847.903.332-05");
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(260);
});

test("Deve criar um pedido com o código", function () {
    const order = new Order("847.903.332-05", new Date("2021-03-01"), 1);
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    expect(order.code).toBe("202100000001");
});
