// Generated by CoffeeScript 1.3.3
var AnimationBox, MobileModal;

AnimationBox = {
  _div: $("animation-box"),
  _top_div: $("top-box"),
  _middle_div: $("middle-box"),
  _bottom_div: $("bottom-box"),
  _HIDDEN_STYLE: {
    opacity: "0",
    filter: "alpha(opacity=0)"
  },
  _VISIBLE_STYLE: {
    opacity: "1",
    filter: "alpha(opacity=100)"
  },
  _HIDDEN_STYLE_STR: "opacity: 0; alpha(opacity=0);",
  _VISIBLE_STYLE_STR: "opacity: 1; alpha(opacity=100);",
  _RETURN_TO_BUTTONS_DELAY: 4000,
  _set_start_style: function() {
    AnimationBox._top_div.setStyle(AnimationBox._HIDDEN_STYLE);
    AnimationBox._bottom_div.setStyle(AnimationBox._HIDDEN_STYLE);
    return AnimationBox._middle_div.setStyle(AnimationBox._VISIBLE_STYLE);
  },
  _add_listeners: function() {
    $("text-button").observe("click", AnimationBox._click_text_button);
    $("email-button").observe("click", AnimationBox._click_email_button);
    $("cancel-email").observe("click", AnimationBox._click_cancel_email);
    $("cancel-phone").observe("click", AnimationBox._click_cancel_phone);
    $("email-input-background").observe("click", function() {
      return $("email-input").focus();
    });
    $("phone-input-background").observe("click", function() {
      return $("phone-input").focus();
    });
    $("email-input-label").observe("click", function() {
      return $("email-input").focus();
    });
    $("phone-input-label").observe("click", function() {
      return $("phone-input").focus();
    });
    $("email-form").observe("submit", function(e) {
      e.preventDefault();
      return AnimationBox._click_send_email();
    });
    $("text-form").observe("submit", function(e) {
      e.preventDefault();
      return AnimationBox._click_send_text();
    });
    $("send-email").observe("click", AnimationBox._click_send_email);
    return $("send-text").observe("click", AnimationBox._click_send_text);
  },
  _hide_background: function() {
    var animation_box_cover_classes, i, _i, _len, _results;
    animation_box_cover_classes = $w($("animation-box-cover").className);
    _results = [];
    for (_i = 0, _len = animation_box_cover_classes.length; _i < _len; _i++) {
      i = animation_box_cover_classes[_i];
      _results.push($("animation-box-cover").removeClassName(i));
    }
    return _results;
  },
  _show_sending_background: function(device_type) {
    $("animation-box-cover").addClassName("sending");
    if (device_type === "phone" || device_type === "email") {
      return $("animation-box-cover").addClassName(device_type);
    }
  },
  _show_success_background: function(device_type) {
    $("animation-box-cover").addClassName("success");
    if (device_type === "phone" || device_type === "email") {
      return $("animation-box-cover").addClassName(device_type);
    }
  },
  _hide_button_imgs: function() {
    $("text-button").down("img").hide();
    return $("email-button").down("img").hide();
  },
  _show_button_imgs: function() {
    $("text-button").down("img").show();
    return $("email-button").down("img").show();
  },
  _click_text_button: function() {
    $("phone-input").setValue("");
    AnimationBox._middle_to_bottom();
    AnimationBox._clear_top_and_bottom();
    AnimationBox._bottom_div.insert($("enter-phone"));
    return $("phone-input").focus();
  },
  _click_email_button: function() {
    $("email-input").setValue("");
    AnimationBox._middle_to_top();
    AnimationBox._clear_top_and_bottom();
    AnimationBox._top_div.insert($("enter-email"));
    return $("email-input").focus();
  },
  _click_cancel_email: function() {
    AnimationBox._top_to_middle();
    AnimationBox._clear_top_and_bottom();
    return AnimationBox._clear_email_error();
  },
  _click_cancel_phone: function() {
    AnimationBox._bottom_to_middle();
    AnimationBox._clear_top_and_bottom();
    return AnimationBox._clear_text_error();
  },
  _clear_top_and_bottom: function(insert_elm) {
    var elm, _i, _len, _ref;
    _ref = $$(".swap-elm");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elm = _ref[_i];
      $("hidden-elms").insert(elm);
    }
    return AnimationBox._hide_background();
  },
  _click_send_email: function() {
    var recipient;
    AnimationBox._clear_top_and_bottom();
    recipient = $("email-input").getValue();
    if (recipient.length > 24) {
      recipient = recipient.slice(0, 24) + "...";
    }
    $("submitting-email").down(".recipient").__date(recipient);
    AnimationBox._top_div.insert($("submitting-email"));
    AnimationBox._show_sending_background("email");
    return AnimationBox._send_email();
  },
  _click_send_text: function() {
    AnimationBox._clear_top_and_bottom();
    $("recipient-cc").__date($("country-code").getValue());
    $("recipient-phone").__date($("phone-input").getValue());
    AnimationBox._bottom_div.insert($("submitting-phone"));
    AnimationBox._show_sending_background("phone");
    return AnimationBox._send_text();
  },
  _clear_email_error: function() {
    var error;
    error = $("enter-email").down("span.error-message");
    if (error) {
      return error.remove();
    }
  },
  _clear_text_error: function() {
    var error;
    error = $("enter-phone").down("span.error-message");
    if (error) {
      return error.remove();
    }
  },
  _send_email: function() {
    var form;
    form = $("email-form");
    return Forms.ajax_submit(form, false, (function() {
      var t;
      AnimationBox._clear_top_and_bottom();
      AnimationBox._clear_email_error();
      AnimationBox._top_div.insert($("success-email"));
      AnimationBox._show_success_background("email");
      return t = setTimeout(function() {
        AnimationBox._top_to_middle();
        return AnimationBox._clear_top_and_bottom();
      }, AnimationBox._RETURN_TO_BUTTONS_DELAY);
    }), (function() {
      AnimationBox._clear_top_and_bottom();
      AnimationBox._top_div.insert($("enter-email"));
      return $$("br.error-removable")[0].remove();
    }), false);
  },
  _send_text: function() {
    var form;
    form = $("text-form");
    return Forms.ajax_submit(form, false, (function() {
      var t;
      AnimationBox._clear_top_and_bottom();
      AnimationBox._clear_text_error();
      AnimationBox._bottom_div.insert($("success-text"));
      AnimationBox._show_success_background("phone");
      return t = setTimeout(function() {
        AnimationBox._bottom_to_middle();
        return AnimationBox._clear_top_and_bottom();
      }, AnimationBox._RETURN_TO_BUTTONS_DELAY);
    }), (function() {
      AnimationBox._clear_top_and_bottom();
      AnimationBox._bottom_div.insert($("enter-phone"));
      return $$("br.error-removable")[0].remove();
    }), false);
  },
  init: function() {
    AnimationBox._set_start_style();
    AnimationBox._add_listeners();
    return AnimationBox._div.show();
  },
  _middle_to_top: function() {
    $j(AnimationBox._div).animate({
      top: "+=30px"
    }, 100);
    $j(AnimationBox._top_div).css({
      opacity: 1.0
    }).hide().fadeIn(100);
    $j(AnimationBox._middle_div).show().fadeOut(100, function() {
      $j(this).show();
      return $j(this).css({
        opacity: 0
      });
    });
    AnimationBox._hide_button_imgs();
    return $("text-and-email-buttons").hide();
  },
  _top_to_middle: function() {
    $("text-and-email-buttons").show();
    $j(AnimationBox._div).animate({
      top: "-=30px"
    }, 100);
    $j(AnimationBox._middle_div).css({
      opacity: 1.0
    }).hide().fadeIn(100);
    $j(AnimationBox._top_div).show().fadeOut(100, function() {
      $j(this).show();
      return $j(this).css({
        opacity: 0
      });
    });
    return AnimationBox._show_button_imgs();
  },
  _middle_to_bottom: function() {
    $j(AnimationBox._div).animate({
      top: "-=30px"
    }, 100);
    $j(AnimationBox._bottom_div).css({
      opacity: 1.0
    }).hide().fadeIn(100);
    $j(AnimationBox._middle_div).show().fadeOut(100, function() {
      $j(this).show();
      return $j(this).css({
        opacity: 0
      });
    });
    AnimationBox._hide_button_imgs();
    return $("text-and-email-buttons").hide();
  },
  _bottom_to_middle: function() {
    $("text-and-email-buttons").show();
    $j(AnimationBox._div).animate({
      top: "+=30px"
    }, 100);
    $j(AnimationBox._middle_div).css({
      opacity: 1.0
    }).hide().fadeIn(100);
    $j(AnimationBox._bottom_div).show().fadeOut(100, function() {
      $j(this).show();
      return $j(this).css({
        opacity: 0
      });
    });
    return AnimationBox._show_button_imgs();
  }
};

MobileModal = {
  _DEVICES: {
    android: _("Android"),
    iphone: _("iPhone"),
    ipad: _("iPad"),
    blackberry: _("BlackBerry"),
    kindle: _("Kindle Fire")
  },
  _DIRECTIONS_DEVICES: ["blackberry", "kindle"],
  init: function() {
    return $$("div.device").each(function(elm) {
      return elm.observe("click", function(e) {
        var device;
        device = elm.getAttribute("data-device");
        return MobileModal._show(device);
      });
    });
  },
  _add_modal_device_class: function(device) {
    var i, modal_box_classes, _i, _len;
    modal_box_classes = $w($("modal-box").className);
    for (_i = 0, _len = modal_box_classes.length; _i < _len; _i++) {
      i = modal_box_classes[_i];
      $("modal-box").removeClassName(i);
    }
    return $("modal-box").addClassName(device);
  },
  _reset_state: function(device, device_modal) {
    $("modal").removeClassName("gears").addClassName("hills");
    if (MobileModal._DIRECTIONS_DEVICES.indexOf(device) === -1) {
      return;
    }
    device_modal.down("div.options-modal").show();
    device_modal.down("div.directions-modal").hide();
    device_modal.down("input.directions-button").stopObserving("click");
    return device_modal.down("input.back-button").stopObserving("click");
  },
  _init_button_listeners: function(device, device_modal, modal_title) {
    var slide_duration;
    slide_duration = 60;
    device_modal.down("input.directions-button").observe("click", function() {
      var directions_modal_title;
      HiRes.get_background($("modal"), "/static/images/gears-2x.png");
      device_modal.down("div.options-modal").hide();
      device_modal.down("div.directions-modal").show();
      directions_modal_title = _("Installing Dropbox on %(device)s").format({
        device: MobileModal._DEVICES[device]
      });
      $("modal-title").__date(directions_modal_title);
      return $("modal").removeClassName("hills").addClassName("gears");
    });
    return device_modal.down("input.back-button").observe("click", function() {
      HiRes.get_background($("modal"), "/static/images/small-hills-2x.png");
      device_modal.down("div.directions-modal").hide();
      device_modal.down("div.options-modal").show();
      $("modal-title").__date(modal_title);
      return $("modal").removeClassName("gears").addClassName("hills");
    });
  },
  _show: function(device) {
    var device_modal, modal_title;
    if (!MobileModal._DEVICES[device]) {
      return;
    }
    HiRes.get_background($("modal"), "/static/images/small-hills-2x.png");
    device_modal = $(device + "-modal-content");
    MobileModal._add_modal_device_class(device);
    MobileModal._reset_state(device, device_modal);
    modal_title = _("Dropbox for %(device)s").format({
      device: MobileModal._DEVICES[device]
    });
    Modal.show(modal_title, device_modal);
    if (MobileModal._DIRECTIONS_DEVICES.indexOf(device) === -1) {
      return;
    }
    MobileModal._init_button_listeners(device, device_modal, modal_title);
    return device_modal.down(".directions-button").blur();
  }
};

Util.smartLoad(function() {
  $(document.body).writeAttribute({
    ontouchstart: ""
  });
  $(document.body).writeAttribute({
    "data-hi-res-background": "/static/images/mobile_hills_2x.png"
  });
  HiRes.get_background($(document.body), "/static/images/mobile_hills_2x.png");
  AnimationBox.init();
  MobileModal.init();
  return SickInput.init();
});
