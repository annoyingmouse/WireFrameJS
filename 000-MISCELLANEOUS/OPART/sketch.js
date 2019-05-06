import Tile from "./Tile.js";

new p5(p5 => {

    const style = window.getComputedStyle(document.querySelector("body"), null);
    const bodyWidth = parseInt(style.getPropertyValue("width"), 10);;

    const tiles = [];
    let delay = 120;
    let columns = 14;
    let rows = 14;
    let on = p5.color(255, 184, 0);
    let off = p5.color(26, 17, 16);

    let varForm, varFieldSet, delayInput, delayLabel, columnsInput, columnsLabel, onInput, onLabel, offInput, offLabel;

    const reset = () => {
        delay = delayInput.value();
        columns = columnsInput.value();
        rows = columnsInput.value();
        on = onInput.value();
        off = offInput.value();
        tiles.length = 0;
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                tiles.push(new Tile(
                    p5,
                    column * (bodyWidth / columns),
                    row * (bodyWidth / columns),
                    (bodyWidth / columns),
                    row,
                    column % 2 ? ((rows - row) * 5) + 80 : row * 5,
                    delay,
                    on,
                    off
                ));
            }
        }
    }

    const createDelay = () => {
        let delayP = p5.createP();
        delayInput = p5.createSlider(0, 500, delay, 10);
        delayInput.elt.setAttribute("name", "delay");
        delayLabel = document.createElement("LABEL");
        delayLabel.setAttribute("for", "delay");
        delayLabel.innerText = "Delay value"
        delayP.child(delayLabel);
        delayP.child(delayInput);
        varFieldSet.child(delayP);
        delayInput.input(reset);
    }

    const createRows = () => {
        let columnsP = p5.createP();
        columnsInput = p5.createInput(columns.toString(), "number");
        columnsInput.elt.setAttribute("name", "columns");
        columnsLabel = p5.createElement("label");
        columnsLabel.attribute("for", "columns");
        columnsLabel.html("Number of columns/rows");
        columnsP.child(columnsLabel);
        columnsP.child(columnsInput);
        varFieldSet.child(columnsP);
        columnsInput.input(reset);
    }

    const createOn = () => {
        let onP = p5.createP();
        onInput = p5.createColorPicker(on);
        onInput.elt.setAttribute("name", "on");
        onLabel = p5.createElement("label");
        onLabel.attribute("for", "on");
        onLabel.html("On colour")
        onP.child(onLabel);
        onP.child(onInput);
        varFieldSet.child(onP);
        onInput.input(reset);
    }

    const createOff = () => {
        let offP = p5.createP();
        offInput = p5.createColorPicker(off);
        offInput.elt.setAttribute("name", "off");
        offLabel = p5.createElement("label");
        offLabel.attribute("for", "off");
        offLabel.html("Off colour");
        offP.child(offLabel);
        offP.child(offInput);
        varFieldSet.child(offP);
        offInput.input(reset);
    }


    p5.setup = () => {
        p5.createCanvas(bodyWidth, bodyWidth);
        varForm = p5.createElement("form");
        varFieldSet = p5.createElement("fieldset");
        const legend = p5.createElement("legend");
        legend.html("Editable values");
        varForm.child(varFieldSet)
        varFieldSet.child(legend)
        createDelay();
        createRows();
        createOn();
        createOff();
        reset();
    };

    p5.draw = () => {
        p5.background(200);
        tiles.forEach((tile) => {
            p5.image(tile.update(), tile.x, tile.y);
        });
    };
});
