import $ from "jquery";
import DATA from "./data";
import Test from "./test";

const test = new Test(DATA);

$(() => {
	test.init();

	$(".promo__button").on("click", () => {
		$("body").addClass("show-test");
		$("body").removeClass("show-promo");
		$("body").removeClass("show-result");
	});
});
