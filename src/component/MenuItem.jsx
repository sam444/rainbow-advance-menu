import {OnClickEvent,Component,Param} from "rainbowui-core";
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {

    renderComponent() {
        return (
            <li className={this.props.className}>
                <a  href="javascript: void(0);"
                   onClick={this.onClickItem.bind(this)}>
                    <i className={this.props.icon}></i>
                    <span>{this.getI18n(this.props.value)}</span>
                </a>
            </li>
        );
    }

    onClickItem(event){
        event.preventDefault();
        if(this.getDisabled() == "disabled"){
            return;
        }

        if(this.props.onClick != undefined){
            this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }

    getDisabled(){
        if(Util.parseBool(this.props.disabled)){
            return " disabled";
        }
        return "";
    }
};


MenuItem.propTypes = $.extend({}, Component.propTypes, {
    icon: PropTypes.string,
    value: PropTypes.string,
    className:PropTypes.string
});


MenuItem.defaultProps = $.extend({}, Component.defaultProps, {
    icon:"glyphicon glyphicon-home",
    value: "MenuItem"
});