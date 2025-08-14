import React from "react";
import PropTypes from "prop-types";
import "../CommonStyle.scss";
import classNames from "classnames";
import { getLabel } from "../../shared/localization";

const ToggleSwitch = ({
    id,
    name,
    checked,
    onChange,
    optionLabels,
    small,
    disabled,
    styles,
}) => {
    function handleKeyPress(e) {
        if (e.keyCode !== 32) return;

        e.preventDefault();
        onChange(!checked);
    }

    return (
        <div className={"toggle-switch" + (small ? " small-switch" : "")}>
            <input
                type="checkbox"
                name={name}
                className="toggle-switch-checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            {id ? (
                <label
                    className="toggle-switch-label"
                    tabIndex={disabled ? -1 : 1}
                    onKeyDown={(e) => handleKeyPress(e)}
                    htmlFor={id}
                >
                    <span
                        className={
                            disabled
                                ? "toggle-switch-inner toggle-switch-disabled"
                                : "toggle-switch-inner"
                        }
                        data-yes={optionLabels ? optionLabels[0] : getLabel({ module: "common", label: "advance" })}
                        data-no={optionLabels ? optionLabels[1] : getLabel({ module: "common", label: "basic" })}
                        tabIndex={-1}
                    />
                    <span
                        className={classNames(
                            disabled
                                ? "toggle-switch-switch toggle-switch-disabled"
                                : "toggle-switch-switch", (styles && styles)
                        )}
                        tabIndex={-1}
                    />
                </label>
            ) : null}
        </div>
    );
};

// Set optionLabels for rendering.
// ToggleSwitch.defaultProps = {
//     optionLabels: [getLabel({ module: "common", label: "advance" }), getLabel({ module: "common", label: "basic" })]
// };

ToggleSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    optionLabels: PropTypes.array,
    small: PropTypes.bool,
    disabled: PropTypes.bool
};

export default ToggleSwitch;
