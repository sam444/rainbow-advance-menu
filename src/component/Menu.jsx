import "../css/style.css";
import { Component } from "rainbowui-core";
import PropTypes from 'prop-types';

export default class Menu extends Component {
    constructor() {
        super();
        this.flag = true;
    }

    renderFirstRightMenu(firstlevelMenu){
        if(_.isEmpty(firstlevelMenu.childMenu)){
            return <span className="first-menu-hide"><a href="javascript:;" onClick={firstlevelMenu.onClick?firstlevelMenu.onClick.bind(this,firstlevelMenu.param):()=>{}}>{firstlevelMenu.label}</a></span>
        }else{
            return <span className="first-menu-hide">{firstlevelMenu.label}</span>
        }
    }

    renderLeftMenu(){
        const firstlevelMenus = [];
        firstlevelMenus.push(<li data-id="1"><span><span className="glyphicon glyphicon-th-list"></span><span className="first-menu-hide">{this.getI18n(this.props.allMenuName)}</span></span></li>)
        _.each(this.props.dataSource,(firstlevelMenu,index)=>{
           firstlevelMenus.push(<li className={_.isEmpty(firstlevelMenu.childMenu)?'no-right-menu':''} data-id={_.isEmpty(firstlevelMenu.childMenu)?0:index+2}><span><span className={firstlevelMenu.icon}></span>{this.renderFirstRightMenu(firstlevelMenu)}</span></li>) 
        });
        return firstlevelMenus;
    }

    renderAllMenu(){
        const allMenus = [];
        _.each(this.props.dataSource,(allMenu,index)=>{
            allMenus.push(<dl><dt><a href="javascript:;" onClick={allMenu.onClick?allMenu.onClick.bind(this,allMenu.param):()=>{}}> {allMenu.label} <i> &gt;</i></a> </dt><dd>{_.isEmpty(allMenu.childMenu)?null:this.renderSecondAllMenu(allMenu.childMenu)}</dd></dl>) 
        });
        return allMenus;
    }

    renderSecondAllMenu(childMenu){
        const secondAllMenus = [];
        _.each(childMenu,(menu)=>{
            secondAllMenus.push(<a href="javascript:;" onClick={menu.onClick?menu.onClick.bind(this,menu.param):()=>{}} className={_.isEmpty(menu.childMenu)?'no-child-menu':''}><span className={menu.new?'hlight':''}>{menu.label}</span><ul className="threeMenu">{_.isEmpty(menu.childMenu)?null:this.renderThirdAllMenu(menu.childMenu)}</ul></a>);

        });
        return secondAllMenus;
    }

    renderThirdAllMenu(childMenu){
        const thirdAllMenus = [];
        _.each(childMenu,(menu)=>{
            thirdAllMenus.push(<li><a href="javascript:;" onClick={menu.onClick?menu.onClick.bind(this,menu.param):()=>{}}>{menu.label}</a></li>);
        });
        return thirdAllMenus;
    }

    renderRightMenu(){
        const rightMenus = [];
        _.each(this.props.dataSource,(rightMenu,index)=>{
            rightMenus.push(<div className="sub hide" data-id={index+2}><dl><div className="content_left"><div className="left_nav"><ul>{this.renderRightSecondMenu(rightMenu.childMenu)}</ul></div></div></dl></div>);
         });
         return rightMenus;
    }

    renderRightSecondMenu(childMenus){
        const rightSecondMenus = [];
        _.each(childMenus,(childMenu,index)=>{
            rightSecondMenus.push(<li className={_.isEmpty(childMenu.childMenu)?'no-child-menu':''}><div className="t"><i></i><a  href="javascript:;" onClick={childMenu.onClick?childMenu.onClick.bind(this,childMenu.param):()=>{}}>{childMenu.label}</a></div><div className="txt">{this.renderRightThirdMenu(childMenu.childMenu)}</div></li>);
        });
        return rightSecondMenus;
    }

    renderRightThirdMenu(childMenus){
        const rightThiredMenus = [];
        _.each(childMenus,(rightThiredMenu,index)=>{
            rightThiredMenus.push(<p><a  href="javascript:;" onClick={rightThiredMenu.onClick?rightThiredMenu.onClick.bind(this,rightThiredMenu.param):()=>{}}>{rightThiredMenu.label}</a></p>);
        });
        return rightThiredMenus;
    }

    renderComponent() {
        return (
            <div className="menu-containor">
                <div className="nav_left mini-with">
                    <ul>{this.renderLeftMenu()}</ul>
                </div>
                <div className="nav_right hide">
                    <div className="sub hide" data-id="1">
                        {this.renderAllMenu()}                       
                    </div>
                    {this.renderRightMenu()}
                </div>
            </div>
        );
    }

    handleAllMenu(){
        const self = this;

        $('.menu-containor').on('mouseenter', function () {
            //$(".nav_right").removeClass('hide');
        }).on('mouseleave', function () {
            $(".nav_right").addClass('hide');
            $(".sub").addClass('hide');
        }).on('mouseenter', 'li', function (e) {
            if(self.flag){
                if($(this).closest(".threeMenu").length==0){
                    if($(this).closest(".left_nav").length==0){
                        var li_data = $(this).attr('data-id');
                        $(".sub").addClass('hide');
                        $('.sub[data-id="' + li_data + '"]').removeClass('hide');
                    }
                }
            }
        }).on('mouseout', 'li', function (e) {
            self.flag=true;
        })
        $('.content_left').on('mouseenter', function () {
            self.flag=false;
        })
        $('.threeMenu').on('mouseenter', function () {
            self.flag=false;
        })
        const firstMenuLi = $(".menu-containor .nav_left ul li");
        firstMenuLi.on('mouseover', function () {
            $(this).closest("ul").find("li").each(function(){
                $(this).removeClass("active");
            });
            if($(this).hasClass("no-right-menu")){
                $(this).parent().parent().next().addClass("hide");
            }else{
                $(this).addClass("active");
                $(this).parent().parent().next().removeClass("hide");
            }
        })
        const firstRightMenu = $(".menu-containor .nav_right");
        const firstLeftMenu = $(".menu-containor .nav_left");

        firstLeftMenu.on('mouseover', function () {
            $(this).width(200);
            $(this).find('.first-menu-hide').show();
            $(this).removeClass('mini-with');
            $(this).addClass('max-with');

        })
        firstLeftMenu.on('mouseout', function () {
            $(this).width(50);
            $(this).find('.first-menu-hide').hide();
            $(this).removeClass('max-with');
            $(this).addClass('mini-with');
        })

        firstRightMenu.on('mouseover', function () {
            firstLeftMenu.width(200);
            firstLeftMenu.find('.first-menu-hide').show();
        })

        firstRightMenu.on('mouseleave', function () {
            firstLeftMenu.width(50);
            firstLeftMenu.find('.first-menu-hide').hide();
            $(this).prev().find("li").each(function(){
                $(this).removeClass("active");
            });
        })
        const secondMenu = $(".menu-containor .nav_right dd a");
        secondMenu.on('mouseover', function () {
            const obj =  $(this).find(".threeMenu");
            if(obj.length==1){
                obj.show();
            }
        })
        secondMenu.on('mouseout', function () {
            const obj =  $(this).find(".threeMenu");
            if(obj.length==1){
                obj.hide();
            }
        })
    }

    handleOtherMenu(){
        const self = this;

        $(".left_nav li .t i").on('mouseover', function () {
           
        })
        $(".left_nav li .t a").on('mouseover', function () {
            const obj = $(this);
            obj.closest("ul").find("li").each(function(index){
                $(this).find(".t").removeClass("hover");
               $(this).find(".txt").slideUp(0);
            });
            obj.parent(".t").toggleClass("hover");
            obj.parent(".t").next(".txt").slideToggle(0)
        })
        var sl = $(".left_nav li").length;
        //if (sl > 6) {
        //    $(".left_nav li").each(function (index) {
        //        if (index > 5) {
        //            $(this).hide(0)
        //        }
        //    })
        //    $(".left_nav .more").show()
        //} else {
        //    $(".left_nav .more").hide()
        //}
        // $(".left_nav .more").click(function () {
        //     self.opene();
        //     $(this).toggleClass("hover");
        //     var text = $(this).find("span").text();
        //     if (text == "展开") {
        //         $(this).find("span").text("收起");
        //     } else if (text == "收起") {
        //         $(this).find("span").text("展开");
        //     }
        // });
        if ($("div").hasClass("owl-carousel")) {
            $('#scroll').owlCarousel({
                items: 4,
                autoPlay: false,
                navigation: true,
                navigationText: ["", ""],
                scrollPerPage: false
            });
        }
        $(".details_box ul li .more").hover(function () {
            $(this).next(".txt").fadeIn()
        }, function () {
            $(this).next(".txt").fadeOut()
        });
    }

    componentDidMount() {
        
        this.handleAllMenu();

        this.handleOtherMenu();
        
    }

    opene() {
        $(".left_nav li").each(function (index) {
            if (index > 5) {
                $(this).slideToggle(300);
                $(this).find(".t").removeClass("hover");
                $(this).find(".txt").slideUp();
            }
        });
    }

};


Menu.propTypes = $.extend({}, Component.propTypes, {
    dataSource:PropTypes.object
});


Menu.defaultProps = $.extend({}, Component.defaultProps, {

});