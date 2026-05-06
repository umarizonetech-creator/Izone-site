let key = 1;

const hexToRgb = (hex) => {
  const normalized = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_match, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const setColor = (colorName, color, el) => {
  let colorValue;

  if (/^(rgb|rgba)/.test(color)) {
    const [r, g, b] = color.replace(/[rgba()]/g, "").split(",");
    colorValue = `${r},${g},${b}`;
  } else if (/^#/.test(color)) {
    const rgb = hexToRgb(color);
    if (!rgb) return;
    colorValue = `${rgb.r},${rgb.g},${rgb.b}`;
  }

  if (!colorValue) return;

  const target = el || document.documentElement;
  target.style.setProperty(`--k-${colorName}`, colorValue);
};

export default class Kursor {
  constructor(props = {}) {
    this.props = {
      type: 1,
      ...props,
    };
    this.key = key === 1 ? "" : key;
    this.listeners = [];
    key += 1;

    this.render();

    if (!this.kursor || !this.kursorChild) return;

    this.hovers();
    this.mousemove();
    this.down();
  }

  color(color) {
    setColor("color", color, this.kursor);
    setColor("color", color, this.kursorChild);
  }

  hidden(isHidden = true) {
    const method = isHidden ? "addClass" : "removeClass";
    this[method]("kursor--hidden");
    this[method]("kursorChild--hidden", true);
  }

  render() {
    if (this.mobileAndTabletcheck()) return;

    this.createCursor("kursorChild");
    this.createCursor("kursor");

    if (this.props.removeDefaultCursor) {
      document.body.classList.add("notCursor");
    }

    if (this.props.type) {
      this.addClass(`kursor--${this.props.type}`);
    }
  }

  down() {
    this.on(document, "mousedown", () => this.addClass("kursor--down"));
    this.on(document, "mouseup", () => this.removeClass("kursor--down"));
  }

  mousemove() {
    const hasEl = Object.prototype.hasOwnProperty.call(this.props, "el");
    const container = hasEl ? document.querySelector(this.props.el) : window;

    if (!container) return;

    this.on(container, "mousemove", (event) => {
      const cursor = document.querySelector(`.kursor${this.key}`);
      const cursorChild = document.querySelector(`.kursorChild${this.key}`);

      if (!cursor || !cursorChild) return;

      cursor.style.left = `${event.x}px`;
      cursor.style.top = `${event.y}px`;
      cursorChild.style.left = `${event.x}px`;
      cursorChild.style.top = `${event.y}px`;
    });

    const hoverTarget = hasEl ? document.querySelector(this.props.el) : document;
    if (!hoverTarget) return;

    this.on(hoverTarget, "mouseenter", () => this.hidden(false));
    this.on(hoverTarget, "mouseleave", () => this.hidden(true));
  }

  hovers() {
    const hovers = document.querySelectorAll(`.k-hover${this.key}`);

    hovers.forEach((item) => {
      this.on(item, "mouseenter", () => this.addClass("--hover"));
      this.on(item, "mouseleave", () => this.removeClass("--hover"));
    });
  }

  createCursor(name) {
    this[name] = document.createElement("div");
    this[name].setAttribute("class", name);
    this[name].classList.add(name + this.key);
    this[name].setAttribute("style", "--k-color: 0,0,0");
    document.body.insertBefore(this[name], document.body.firstChild);

    if (this.props.color) {
      setColor("color", this.props.color, this[name]);
    }
  }

  addClass(className, child = false) {
    const element = document.querySelector(child ? `.kursorChild${this.key}` : `.kursor${this.key}`);
    element?.classList.add(className);
  }

  removeClass(className, child = false) {
    const element = document.querySelector(child ? `.kursorChild${this.key}` : `.kursor${this.key}`);
    element?.classList.remove(className);
  }

  destroy() {
    this.listeners.forEach(({ target, eventName, handler }) => {
      target.removeEventListener(eventName, handler);
    });
    this.listeners = [];
    this.kursor?.remove();
    this.kursorChild?.remove();

    if (this.props.removeDefaultCursor) {
      document.body.classList.remove("notCursor");
    }
  }

  on(target, eventName, handler) {
    target.addEventListener(eventName, handler);
    this.listeners.push({ target, eventName, handler });
  }

  mobileAndTabletcheck() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      userAgent
    );
  }
}
