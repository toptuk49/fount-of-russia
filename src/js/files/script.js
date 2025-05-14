window.onload = function () {
  document.addEventListener("click", documentActions);
  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains("search-header__button-mobile")) {
      document.querySelector(".search-container").classList.add("_active");
      targetElement.classList.add("_disabled");
      if (
        document.querySelector("html").classList.contains("menu-open") &&
        document.querySelector("html").classList.contains("lock")
      ) {
        document.querySelector("html").classList.remove("menu-open");
        document.querySelector("html").classList.remove("lock");
      }
    }
    if (targetElement.classList.contains("answers-test__finish")) {
      document
        .querySelector(".slider-test .swiper-pagination")
        .classList.add("_hidden");
      let slides = document.querySelectorAll(".slider-test__slide");
      document
        .querySelector(".slider-test .swiper-button-prev")
        .classList.add("_hidden");
      document
        .querySelector(".slider-test .swiper-button-next")
        .classList.add("_hidden");
      for (let i = 0; i < slides.length; i++)
        slides[i].classList.add("_hidden");
      document.querySelector(".result-test").classList.remove("_hidden");
      let answers = 0;
      for (let i = 0; i < answer_list.length; i++)
        true === answer_list[i].checked ? answers++ : answers;
      let correct = 0;
      true === document.querySelector("#ans1_5").checked ? correct++ : correct;
      true === document.querySelector("#ans2_4").checked ? correct++ : correct;
      true === document.querySelector("#ans3_3").checked ? correct++ : correct;
      true === document.querySelector("#ans4_1").checked ? correct++ : correct;
      true === document.querySelector("#ans5_2").checked ? correct++ : correct;
      document.querySelector(".result-test__header").innerHTML =
        "Вы успешно завершили тест";
      document.querySelector(".result-test__resume").innerHTML =
        'Тест <span class="result-test__span"></span>';
      let correct_text = "";
      if (2 === correct || 3 === correct || 4 === correct)
        correct_text = "ответа верны";
      else if (1 === correct) correct_text = "ответ верный";
      else if (5 === correct || 0 === correct) correct_text = "ответов верны";
      let answers_text = "";
      let answers_pretext = "";
      if (2 === answers || 3 === answers || 4 === answers) {
        answers_pretext = "Дано";
        answers_text = "ответа";
      } else if (1 === answers) {
        answers_pretext = "Дан";
        answers_text = "ответ";
      } else if (5 === answers || 0 === answers) {
        answers_pretext = "Дано";
        answers_text = "ответов";
      }
      document.querySelector(".result-test__given").innerHTML =
        `${answers_pretext} ${answers} <b>${answers_text}</b>, из них ${correct} ${correct_text}`;
      if (correct >= 4) {
        document
          .querySelector(".result-test__span")
          .classList.add("result-test__span-passed");
        document.querySelector(".result-test__span").innerHTML = "пройден.";
      } else {
        document
          .querySelector(".result-test__span")
          .classList.add("result-test__span-not-passed");
        document.querySelector(".result-test__span").innerHTML = "не пройден.";
      }
    }
  }
  let pagination_bullets = document.querySelectorAll(
    ".slider-test .swiper-pagination-bullet"
  );
  function checkRadio(e) {
    if ("answer1" === e.target.name) {
      "ans1_5" === e.target.id;
      pagination_bullets[0].classList.add("swiper-pagination-bullet-done");
    } else if ("answer2" === e.target.name)
      pagination_bullets[1].classList.add("swiper-pagination-bullet-done");
    else if ("answer3" === e.target.name)
      pagination_bullets[2].classList.add("swiper-pagination-bullet-done");
    else if ("answer4" === e.target.name)
      pagination_bullets[3].classList.add("swiper-pagination-bullet-done");
    else if ("answer5" === e.target.name)
      pagination_bullets[4].classList.add("swiper-pagination-bullet-done");
  }
  let answer_list = document.querySelectorAll(".answers-test__item input");
  for (let i = 0; i < answer_list.length; i++) {
    answer_list[i].addEventListener("click", checkRadio);
    answer_list[i].checked = false;
  }
};
