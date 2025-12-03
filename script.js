function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let startupCancelled = false;

function skipStartup() {
    startupCancelled = true;

    const startup = document.querySelector(".startup");
    const started = document.querySelector(".started");

    startup.style.opacity = "0";
    startup.style.display = "none";
    started.style.display = "block";
    started.style.opacity = "1";
}

function newTextContainer(text, parent, color) {
    const container = document.createElement("div");
    container.className = "text-container";
    const string = text;
    const realtext = string.split("|");

    container.innerHTML = `[ <span style="color: ${color}">${realtext[0]}</span>] ${realtext[1]}`;

    parent.appendChild(container);
}

async function startup() {
    const startup = document.querySelector(".startup");
    const started = document.querySelector(".started");
    const startuptext = document.getElementById("startuptext");
    started.style.display = "none";

    if (startupCancelled) return;

    newTextContainer(
        `      OK      | Started service projectsly.online`,
        startuptext,
        "green"
    );
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(
        `      OK      | Started Set console font and keymap`,
        startuptext,
        "green"
    );
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(
        `    FAILED    | Error: Could not find /projectsly.online/aarav - No such service present`,
        startuptext,
        "red"
    );
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Retrying: 5s`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Retrying: 4s`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Retrying: 3s`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Retrying: 2s`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Retrying: 1s`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(
        `      OK      | Started service /projectsly.online/aarav`,
        startuptext,
        "green"
    );
    await sleep(1000);

    if (startupCancelled) return;
    newTextContainer(`      OK      | Starting GUI....`, startuptext, "green");
    await sleep(1000);

    if (startupCancelled) return;
    startup.style.opacity = "0";
    await sleep(500);

    if (startupCancelled) return;
    startup.style.display = "none";
    await sleep(500);

    if (startupCancelled) return;
    started.style.display = "block";
    started.style.opacity = "1";
}

(function () {
    function addCornerDecorations() {
        document
            .querySelectorAll(".animation-container")
            .forEach((container) => {
                const corners = [
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                ];
                corners.forEach((position) => {
                    const corner = document.createElement("div");
                    corner.className = `corner ${position}`;
                    const svg = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );
                    svg.setAttribute("width", "16");
                    svg.setAttribute("height", "16");
                    svg.setAttribute("viewBox", "0 0 512 512");
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    const polygon = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "polygon"
                    );
                    polygon.setAttribute(
                        "points",
                        "448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
                    );
                    polygon.setAttribute("fill", "currentColor");
                    svg.appendChild(polygon);
                    corner.appendChild(svg);
                    container.appendChild(corner);
                });
            });
    }

    function setupSpiralGalaxy() {
        const container = document.getElementById("spiral-galaxy");
        if (!container) return;
        container.innerHTML = "";
        const canvas = document.createElement("canvas");

        function setCanvasSize() {
            const desiredWidthVW = 35;
            const desiredHeightVH = 35;
            const newWidth = (window.innerWidth * desiredWidthVW) / 100;
            const newHeight = (window.innerHeight * desiredHeightVH) / 100;
            canvas.width = newWidth;
            canvas.height = newHeight;
            canvas.style.scale = "1";
            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            maxRadius = Math.min(centerX, centerY) * 0.8;
        }

        container.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        let centerX;
        let centerY;
        let maxRadius;
        let time = 0;
        let lastTime = 0;
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        const particleCount = 1000;
        const spiralArms = 5;
        const rotationSpeed = 0.01;

        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const distanceFactor = Math.pow(Math.random(), 0.5);
            const distance = distanceFactor * maxRadius;
            const armIndex = Math.floor(Math.random() * spiralArms);
            const armOffset = (armIndex / spiralArms) * Math.PI * 2;
            const spiralTightness = 0.2;
            const spiralAngle = Math.log(distance / 5) / spiralTightness;
            particles.push({
                distance: distance,
                angle: spiralAngle + armOffset,
                armIndex: armIndex,
                size: 1 + Math.random() * 1.5,
                opacity: 0.3 + Math.random() * 0.7,
                speedFactor: 0.8 + Math.random() * 0.4,
                color: {
                    r: 220 + Math.floor(Math.random() * 35),
                    g: 220 + Math.floor(Math.random() * 35),
                    b: 255,
                },
            });
        }

        function animate(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            time += deltaTime * 0.001;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fill();
            for (const particle of particles) {
                const rotationFactor = 1 / Math.sqrt(particle.distance / 10);
                particle.angle +=
                    rotationSpeed *
                    rotationFactor *
                    particle.speedFactor *
                    deltaTime *
                    0.05;
                const x =
                    centerX + Math.cos(particle.angle) * particle.distance;
                const y =
                    centerY + Math.sin(particle.angle) * particle.distance;
                const armPhase =
                    (time * 0.5 + particle.armIndex / spiralArms) % 1;
                const pulseFactor =
                    Math.sin(armPhase * Math.PI * 2) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(x, y, particle.size * pulseFactor, 0, Math.PI * 2);
                const finalOpacity = particle.opacity * pulseFactor;
                ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${finalOpacity})`;
                ctx.fill();
                if (particle.size > 1.8) {
                    const trailLength = particle.distance * 0.15;
                    const trailAngle = particle.angle - 0.1 * rotationFactor;
                    const trailX =
                        centerX +
                        Math.cos(trailAngle) *
                            (particle.distance - trailLength);
                    const trailY =
                        centerY +
                        Math.sin(trailAngle) *
                            (particle.distance - trailLength);
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(trailX, trailY);
                    ctx.strokeStyle = `rgba(${particle.color.r}, ${
                        particle.color.g
                    }, ${particle.color.b}, ${finalOpacity * 0.3})`;
                    ctx.lineWidth = particle.size * 0.5;
                    ctx.stroke();
                }
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener("load", function () {
        setupSpiralGalaxy();
        addCornerDecorations();
    });
})();

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+[]{}|;:',.<>?`~";

document.querySelectorAll(".obfuscate").forEach((element) => {
    const originalText = element.innerText;
    let interval = null;
    let iteration = 0;
    let isHovered = false;

    const scramble = () => {
        element.innerText = originalText
            .split("")
            .map(
                () => characters[Math.floor(Math.random() * characters.length)]
            )
            .join("");
    };

    const startScrambling = () => {
        clearInterval(interval);
        interval = setInterval(scramble, 30);
    };

    const startReveal = () => {
        clearInterval(interval);
        iteration = 0;

        interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }

                    return characters[
                        Math.floor(Math.random() * characters.length)
                    ];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            } else {
                iteration += 1 / 2;
            }
        }, 10);
    };

    element.addEventListener("mouseenter", () => {
        isHovered = true;
        startReveal();
    });

    element.addEventListener("mouseleave", () => {
        isHovered = false;
        startScrambling();
    });

    startScrambling();
});
const spiralGalaxy = document.getElementById("spiral-galaxy");

spiralGalaxy.addEventListener("mouseenter", () => {
    spiralGalaxy.style.scale = "1.5";
});

spiralGalaxy.addEventListener("mouseleave", () => {
    spiralGalaxy.style.scale = "1";
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById("age").innerText = getAge("2011-11-21");

startup();
