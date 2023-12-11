document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("inviteButton");
  const envelope = document.getElementById("envelope");
  const card = document.getElementById("card");
  let flipped = false;

  function pullOut() {
    return gsap
      .timeline()
      .to(
        "#flap",
        1,
        {
          rotationX: 180,
          ease: Power1.easeInOut,
        },
        "scaleBack"
      )
      .to(
        "#invitation",
        1,
        {
          scale: 0.8,
          ease: Power4.easeInOut,
        },
        "scaleBack"
      )
      .set("#flap", {
        zIndex: 0,
      })
      .to("#card", 1, {
        y: "0%",
        scaleY: 1.2,
        ease: Circ.easeInOut,
      })
      .set(".mask", {
        overflow: "visible",
        onComplete: function () {
          envelope.classList.toggle("is-open");
        },
      })
      .to(
        ".mask",
        1.3,
        {
          "clip-path": "inset(0 0 0% 0)",
          ease: Circ.easeInOut,
        },
        "moveDown"
      )
      .to(
        "#card",
        1.3,
        {
          y: "100%",
          scaleY: 1,
          ease: Circ.easeInOut,
        },
        "moveDown"
      )
      .to(
        button,
        1,
        {
          y: "180px",
          ease: Circ.easeInOut,
          onComplete: toggleText,
        },
        "moveDown+=0.15"
      );
  }

  function toggleFlip() {
    if (!envelope.classList.contains("is-open")) {
      return;
    }

    const ry = !flipped ? 180 : 0;
    flipped = !flipped ? true : false;

    gsap.to("#card", 1, {
      rotationY: ry,
      ease: Power4.easeInOut,
      onComplete: toggleText,
    });
  }

  function toggleText() {
    const text = flipped ? "Xem kĩ hơn" : "Đi liền";
    button.innerHTML = text;

    if (flipped) {
      gsap.set(".body-gif", {
        display: "none",
      });
      gsap.set(".body-gif-back", {
        display: "block",
      });
    } else {
      gsap.set(".body-gif", {
        display: "block",
      });
      gsap.set(".body-gif-back", {
        display: "none",
      });
    }
  }

  button.addEventListener("click", pullOut);
  button.addEventListener("click", toggleFlip);
});
