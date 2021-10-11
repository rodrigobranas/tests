export default class OrderCode {
	value: string;

	constructor (issueDate: Date, sequence: number) {
		this.value = this.generateCode(issueDate, sequence);
	}

	generateCode (issueDate: Date, sequence: number) {
		const year = issueDate.getFullYear();
		const sequenceWith8Char = `${sequence}`.padStart(8, "0");
		return `${year}${sequenceWith8Char}`;
	}
}
