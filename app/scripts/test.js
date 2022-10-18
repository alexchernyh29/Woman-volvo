class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
			Г: 0,
			Д: 0,
		};
		this.currentAnswer = "";

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__counter span");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__item");
		this.$answer = $(".test__answer");
		this.$questionWomanImage = $(".test__picture");
		this.$testBtn = $(".test__btn");

		this.$resultFrameAnswer = $(".result__answer");
		this.$resultFrameTitle = $(".result__title");
		this.$resultFrameText = $(".result__text");
		this.$resultBgImage = $(".result");
		this.$resultBtn = $(".result__btn");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$testBtn.on("click", () => {
			if (!this.currentAnswer) return;
			this.answers[this.currentAnswer] += 1;
			this.activeIndex += 1;
			this.currentAnswer = "";
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.currentAnswer = id;
			$(".test__item").removeClass("is-active");
			$(e.target).closest(".test__item").addClass("is-active");
		});
		this.$resultBtn.on("click", () => {
			$("body").removeClass("show-promo");
			$("body").removeClass("show-result");
			$("body").addClass("show-test");
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
				В: 0,
				Г: 0,
				Д: 0,
			};
			this.$testBtn.text("далее");
			this.renderQuestion();
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		$(".test").css(
			"background-image",
			`url("/images/test-bg${this.activeIndex + 1}.jpg")`
		);
		this.$answerItem.each((id, item) => {
			$(item).find(".test__answer-text").html(answers[id].text);
		});
		$(".test__item").removeClass("is-active");
		if (this.activeIndex >= this.questions.length - 1) {
			this.$testBtn.text("узнать результат");
		}
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	getWinnerIndex(winner) {
		let index = 0;
		this.results.forEach((item, i) => {
			if (item.id === winner) {
				index = i;
			}
		});
		return index + 1;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").addClass("show-result");
		$("body").removeClass("show-test");
		$("body").removeClass("show-promo");
		const idx = this.getWinnerIndex(winner);
		const currentResult = this.results.find((item) => item.id === winner);
		const { title, answer, text } = currentResult;
		this.$resultFrameAnswer.html(answer);
		this.$resultFrameTitle.html(title);
		this.$resultFrameText.html(text);
		$(".result").css(
			"background-image",
			`url("/images/result-bg${idx}.jpg")`
		);
	}
}

export default Test;
