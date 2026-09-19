document.addEventListener("DOMContentLoaded", function () {
    // ---------------------------------------------------------------
    // Dark mode toggle
    // ---------------------------------------------------------------
    var themeToggle = document.getElementById("theme-toggle");

    function applyToggleIcon() {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (themeToggle) themeToggle.textContent = isDark ? "☀️" : "🌙";
    }

    if (themeToggle) {
        applyToggleIcon();
        themeToggle.addEventListener("click", function () {
            var isDark = document.documentElement.getAttribute("data-theme") === "dark";
            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("polls-theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("polls-theme", "dark");
            }
            applyToggleIcon();
        });
    }

    // ---------------------------------------------------------------
    // Index page: live search filter over the question list
    // ---------------------------------------------------------------
    var searchBox = document.getElementById("poll-search");
    var questionList = document.querySelector(".js-question-list");

    if (searchBox && questionList) {
        var items = Array.prototype.slice.call(
            questionList.querySelectorAll(".question-item")
        );
        var noResults = document.querySelector(".js-no-results");

        searchBox.addEventListener("input", function () {
            var query = searchBox.value.trim().toLowerCase();
            var visibleCount = 0;

            items.forEach(function (item) {
                var text = item.querySelector(".question-text").textContent.toLowerCase();
                var matches = text.indexOf(query) !== -1;
                item.hidden = !matches;
                if (matches) visibleCount++;
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }
        });
    }

    // ---------------------------------------------------------------
    // Detail page: highlight selected choice, enable Vote button
    // ---------------------------------------------------------------
    var voteForm = document.querySelector(".js-vote-form");

    if (voteForm) {
        var choiceOptions = Array.prototype.slice.call(
            voteForm.querySelectorAll(".choice-option")
        );
        var voteBtn = voteForm.querySelector(".js-vote-btn");

        choiceOptions.forEach(function (option) {
            var input = option.querySelector("input[type=radio]");

            input.addEventListener("change", function () {
                choiceOptions.forEach(function (opt) {
                    opt.classList.remove("selected");
                });
                option.classList.add("selected");
                if (voteBtn) voteBtn.disabled = false;
            });
        });
    }

    // ---------------------------------------------------------------
    // Results page: animate bar widths from 0 to their target percent
    // ---------------------------------------------------------------
    var resultBars = document.querySelectorAll(".js-results .bar-fill");

    if (resultBars.length) {
        resultBars.forEach(function (bar) {
            var percent = bar.getAttribute("data-percent") || 0;
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    bar.style.width = percent + "%";
                });
            });
        });
    }

    // ---------------------------------------------------------------
    // Count-up animation for any number with class js-countup
    // ---------------------------------------------------------------
    var countUpEls = document.querySelectorAll(".js-countup");

    countUpEls.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-target"), 10) || 0;
        var duration = 700;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    });

    // ---------------------------------------------------------------
    // Subtle 3D tilt effect on cards / question links
    // ---------------------------------------------------------------
    var tiltEls = document.querySelectorAll(".tilt");

    tiltEls.forEach(function (el) {
        el.addEventListener("mousemove", function (e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var midX = rect.width / 2;
            var midY = rect.height / 2;
            var rotateX = ((midY - y) / midY) * 4;
            var rotateY = ((x - midX) / midX) * 4;
            el.style.transform =
                "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        });

        el.addEventListener("mouseleave", function () {
            el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
        });
    });

    // ---------------------------------------------------------------
    // Confetti + toast celebration after a successful vote
    // ---------------------------------------------------------------
    if (document.querySelector(".js-just-voted")) {
        showToast("Thanks for voting! 🎉");
        launchConfetti();

        // Clean the ?voted=1 param from the URL so a refresh doesn't replay it.
        if (window.history && window.history.replaceState) {
            var url = new URL(window.location.href);
            url.searchParams.delete("voted");
            window.history.replaceState({}, "", url);
        }
    }

    function showToast(message) {
        var toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.hidden = false;
        toast.classList.add("toast-visible");
        setTimeout(function () {
            toast.classList.remove("toast-visible");
            setTimeout(function () {
                toast.hidden = true;
            }, 300);
        }, 2200);
    }

    function launchConfetti() {
        var canvas = document.createElement("canvas");
        canvas.className = "confetti-canvas";
        document.body.appendChild(canvas);
        var ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        var colors = ["#4f46e5", "#818cf8", "#f472b6", "#facc15", "#34d399"];
        var pieces = [];
        var count = 90;

        for (var i = 0; i < count; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * canvas.height * 0.5,
                size: 4 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: 2 + Math.random() * 3,
                speedX: -1.5 + Math.random() * 3,
                rotation: Math.random() * 360,
                rotationSpeed: -6 + Math.random() * 12,
            });
        }

        var startedAt = Date.now();
        var durationMs = 2600;

        function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var elapsed = Date.now() - startedAt;

            pieces.forEach(function (p) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
            });

            if (elapsed < durationMs) {
                requestAnimationFrame(frame);
            } else {
                window.removeEventListener("resize", resize);
                canvas.remove();
            }
        }

        requestAnimationFrame(frame);
    }
});
