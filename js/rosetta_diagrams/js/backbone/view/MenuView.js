define(['views/globals','views/SubdiagramView','Backbone'],function(view_globals,SubdiagramView,Backbone) {
	var MenuView = Backbone.View.extend({
		el:'#toolbar',
		eventagg: undefined,
		timeoutId: undefined,
		connectionReady: undefined,
		
		events:{
			'mouseenter':'mouseenter',
			'mouseleave':'hide_menu_delay',
			'click #btn_delete' : 'delete_element',
			'click #btn_connect' : 'connect_element',
			'click #btn_info': 'show_info',
			'click #btn_subdiagram':'open_subdiagram'
		},
		
		open_subdiagram:function() {
			view_globals.event_agg.trigger('editDiagramElement',undefined); //Cancels all the highlights in the previous diagram.
			var model = this.model;
			this.model.get('subdiagram').get('elements').fetch({success:function() {
				var view = new SubdiagramView({model:model});
				view.render();	
			}});
			
		},
		
		delete_element: function() { 
			this.model.destroy();
			this.model = undefined;
			this.hide_menu_now();
		},
		
		get_current_model_name:function() {
			return this.model.get('name');
		},
		
		show_info:function(e){
			var wiki_obj =$('#wiki_info'); 
			var frame_src = view_globals.Attributes[this.model.get('type')].wiki_address+this.model.get('name');
			wiki_obj.find('iframe').attr('src', frame_src);
			wiki_obj.dialog('option','title',this.model.get('name')).dialog('open');
		},
		
		initialize: function(options) {
			this.$("#btn_delete").button({
				text: false,
				icons: {
					primary: 'ui-icon-trash'
				}
			});
			this.eventagg = options.eventagg;
			
			this.$("#btn_subdiagram").button({
				text:false,
				icons:{
					primary:"ui-icon-newwin"
				}
			});
			this.$("#btn_connect").button({
				text: false,
				icons:{
					primary: 'ui-icon-arrowthick-1-e'
				}
			});
			this.$("#btn_info").button({
				text: false,
				icons:{
					primary: 'ui-icon-info'
				}
			});
		    $( "#wiki_info" ).dialog({
		        autoOpen: false,
		        modal: true,
		        width: window.innerWidth*0.35,
		        height: window.innerHeight*0.35,
		        open: function (event, ui) {
		            $('#wiki_info').css('overflow', 'hidden'); //this line does the actual hiding
		        }
		      });
		    $('#wiki_info').find('iframe').load($('#wiki_info').find('iframe').css('display','inline')); 
		    
			_.bindAll(this, "show_menu_delay");
			this.eventagg.bind("show_menu_delay",this.show_menu_delay);
			_.bindAll(this, "hide_menu_delay");
			this.eventagg.bind("hide_menu_delay",this.hide_menu_delay);
			_.bindAll(this, "hide_menu_now");

			this.eventagg.bind("hide_menu_now",this.hide_menu_now);

		},
		
		show_menu_delay:function(element,pos,options){
			this.model = element;
			
			clearTimeout(this.timeoutId);
			
			if ( this.model == undefined ){
				alert("ERROR: Undefined element!");
				return;
			}
			
			var items_to_hide = options.items_to_hide;
			var context = this;
			context.$('button').button({disabled:false});
			if ( items_to_hide != undefined ) {
				_.each(items_to_hide,function(item) { 
					context.$(item).button({disabled: true});
				});
			}
			this.$el.css(
				{
					display:'inline',
					'z-index': $.ui.dialog.maxZ+100
				}
			);
			this.$el.offset({left:pos.left, top:pos.top-this.$el.height()-15 });
			
		},
		mouseenter: function(e) {
			clearTimeout(this.timeoutId);
		},
		
		hide_menu_now: function(e) { 
			this.hide_menu_delay(0);
		},
		hide_menu_delay: function(time_out){
			if ( time_out == undefined )
				time_out = view_globals.MENU_TIMEOUT;	
			clearTimeout(this.timeoutId);
			var obj = this.$el;
			var t = this;
			this.timeoutId = setTimeout(function() {
				obj.css({
					display: 'none'
				});
				t.model = undefined;
			},time_out);
		},
		
		connect_element:function() {
			this.connectionReady = true;
			console.log("Connection mode is " + this.connectionReady);
			this.model.connect_element();
		}
	});
	
	return MenuView;
});