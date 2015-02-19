$(function() {
  var end_next_day, start_next_day;
  start_next_day = $("#challenge_start_date").val();
  end_next_day = $("#challenge_end_date").val();
  $("input.datetimepicker-start").datetimepicker({
    format: "YYYY-MM-DD",
    pickTime: false,
    minDate: Date()
  });
  $("input.datetimepicker-end").datetimepicker({
    format: "YYYY-MM-DD",
    pickTime: false,
    minDate: Date()
  });
  $("input.datetimepicker-start").on("dp.change", function(e) {
    $('input.datetimepicker-end').data("DateTimePicker").setMinDate(e.date);
  });
  return $("input.datetimepicker-end").on("dp.change", function(e) {
    $('input.datetimepicker-start').data("DateTimePicker").setMaxDate(e.date);
  });
});

function delete_ballyhoo(element){
  if (confirm('Are you sure?')){
    id = $(element).attr("id")
    $.ajax({
      url: '/ballyhoos/'+id+'/destroy',
      type: "GET"
    });
  }
}
$(document).ready(function(){
  settings();
});

function add_days(element){
  $('.error').remove();
  if ($(element).val() != ''){
    var activation_date = $('#check_start_date').val();
    var day = parseInt($(element).val());
    day = day - 1
    activation_date = DateFromString(activation_date,day);
    $('#ballyhoo_end_repeat').val(activation_date);
  }
}

function DateFromString(str,day){
  str = str.split(/\D+/);
  str = new Date(str[2],str[1]-1,(parseInt(str[0])+day));
  return DDMMYYYY(str);
}
function DDMMYYYY(str) {
  var ndateArr = str.toString().split(' ');
  var Months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec';
  return ndateArr[2]+'-'+(parseInt(Months.indexOf(ndateArr[1])/4)+1)+'-'+ndateArr[3];
}

/*
 if user clicks on radio_button and selects date from calender, this function on change date
sets end_repeat value.
 */

function set_end_repeat_date(element){
  $('.error').remove();
  if ($(element).val() != ''){
    $('#ballyhoo_end_repeat').val($(element).val());
  }
}

function set_repeat_type(element){
  
  if ($(element).val() == "weekly"){
    $('.daily').hide();
    $('.weekly').show();
    $('#end_repeat_w_uper').prop("checked",true)
    $('#end_repeat_w_lower').attr("checked",false)
    on_date_readonly();
    $('#ballyhoo_repeat_type').val("1")
  }
  else{
    $('.daily').show();
    $('.weekly').hide();
    $('#end_repeat_d_uper').prop("checked",true)
    $('#end_repeat_d_lower').attr("checked",false)
    on_date_readonly();
    $('#ballyhoo_repeat_type').val("0")
  }
}

function select_day(element){
  var repeating_days = [];
  $('.append_days').html("Weekly");
  $('.on_day').each(function(){
    if ($(this).is(":checked"))
    {
      repeating_days.push($(this).attr("id"));
      $('.append_days').append(''+','+$(this).attr("id"));
    }
    $('#ballyhoo_repeating_days').val(repeating_days);
  });
}

/*if user clicks on cancel button close modal and reset data.*/
function close_repeat_modal(){
  $('.error').remove();
  $('#ballyhoo_repeat').prop('checked','');
  $('#ballyhoo_repeat_type').val("0");
  $('#ballyhoo_end_repeat').val('');
  $('.on_day').each(function(){
    $(this).prop('checked','');
  });
  //////////////////////////////////////
  on_date_readonly();
  ////////////////////////////////////////
  $('#end_repeat_d_uper').prop('checked','checked');
  $('#end_repeat_w_uper').prop('checked','checked');
  $('.append_days').html("Weekly");
  $('#modal-repeat').modal('hide');
  $('#duration_anchor').hide();
}

function after_date_readonly()
{
  $('.error').remove();
  $('.on_date').attr("readonly",false);
  $('.after_date').attr("readonly",true);
  $('.after_date').val("");
}
function on_date_readonly()
{
  $('.error').remove();
  $('.on_date').attr("readonly",true);
  $('.on_date').val("");
  $('.after_date').attr("readonly",false);
}
//Edit booster if its have upcoming action date
function edit_ballyhoo(element)
{
  id = $(element).attr("id")
  $.ajax({
    url: '/ballyhoos/'+id+'/edit',
    type: "GET"
  });
}
function hide_to_from(){
  hide_or_show_date_fields();
}
function hide_or_show_date_fields()
{
  if ($('#ballyhoo_all_day').is(':checked')){
    $('#ballyhoo_start_time').prop("required",false);
    $('#ballyhoo_end_time').prop("required",false);
    $('#ballyhoo_start_time').val('')
    $('#ballyhoo_end_time').val('')
    $('#from_to').hide();
  }
  else
  {
    $('#ballyhoo_start_time').prop("required",true);
    $('#ballyhoo_end_time').prop("required",true);
    $('#from_to').show();
  }
}

function settings()
{
  // validating
  $('#new_ballyhoo').validate();

  //Hide the Edit anchor when page loads
  $('#duration_anchor').hide();
  $('.weekly').hide();
  /*
   1 - On clicking repeat type check_box it first confirms check_box is checked.
   2 - In second step it confirms activation date is entered by user.
   3 - If avtivation date is not nill , shows pop up.
   */
  $('#ballyhoo_repeat').click(function(){
    $('.error').remove();
    if ($('#ballyhoo_repeat').is(':checked')){
      if ($('#check_start_date').val() != ''){
        $('#modal-repeat').modal({
          backdrop: 'static'
        });
      }
      else{
        $('#check_start_date').parent().append('<label class="error" for="menu_item_name">Activation date is required.</label>');
        $('#ballyhoo_repeat').prop('checked','');
      }
    }
    else
    {
      close_repeat_modal();
    }
  });
  /*Clicking on save button will hide the repeat modal*/
  $('#repeat_modal_popup_btn').click(function()
  {
    window.bool = true
    if ($('#repeat-select').val() == "daily"){
      if ($('#end_repeat_d_uper').is(':checked')){
        if ($(this).parent().parent().parent().parent().find('.col-sm-33').children().val()==''){
          $('.error').remove();
          window.bool = false
          $(this).parent().parent().parent().parent().find('.col-sm-33').children().parent().append('<label class="error" for="menu_item_name">This field is required.</label>');
        }
      }
      else if ($('#end_repeat_d_lower').is(':checked')){
        if ($(this).parent().parent().parent().parent().find('.col-sm-34').children().val()==''){
          $('.error').remove();
          window.bool = false
          $(this).parent().parent().parent().parent().find('.col-sm-34').children().parent().append('<label class="error" for="menu_item_name">This field is required.</label>');
        }
      }
    }
    else{
      if ($('#end_repeat_w_uper').is(':checked')){
        if ($(this).parent().parent().parent().parent().find('.col-sm-33-w').children().val()=='')
        {
          $('.error').remove();
          window.bool = false
          $(this).parent().parent().parent().parent().find('.col-sm-33-w').children().parent().append('<label class="error" for="menu_item_name">This field is required.</label>');
        }
      }
      else if ($('#end_repeat_w_lower').is(':checked')){
        if ($(this).parent().parent().parent().parent().find('.col-sm-34-w').children().val()==''){
          $('.error').remove();
          window.bool = false
          $(this).parent().parent().parent().parent().find('.col-sm-34-w').children().parent().append('<label class="error" for="menu_item_name">This field is required.</label>');
        }
      }
    }
    if (window.bool){
      if ($('#repeat-select').val() == "weekly"){
        $("#duration").html("Weekly")
        var repeating_days = [];
        $('.on_day').each(function(){
          if ($(this).is(":checked"))
          {
            repeating_days.push($(this).attr("id"));
            $('#duration').append(''+','+$(this).attr("id"));
          }
        })
      }
      else{
        $("#duration").html("Daily")
      }
      $('#modal-repeat').modal("hide");
      $("#duration_anchor").show();
    }
  });
  //when page loads set text_field to readonly for on end_repeat date
  $('.on_date').attr("readonly","readonly");
  //change readonly property of text fields
  ////////////////////////////////////////////
  $('#end_repeat_d_lower').click(function(){
    after_date_readonly();
  });
  $('#end_repeat_d_uper').click(function(){
    on_date_readonly();
  });
  $('#end_repeat_w_lower').click(function(){
    after_date_readonly();
  });
  $('#end_repeat_w_uper').click(function(){
    on_date_readonly();
  });
  $('#end_repeat_never').click(function(){
    $('.after_date').attr("readonly",true);
    $('.on_date').attr("readonly",true);
    $('#ballyhoo_repeat_type').val("3")
  });
  //////////////////////////////////////////////
  $(".after_date").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
  $(document).on("change", "select.ballyhoo_type_selector", function(e) {
    booster_form_settings();
    // $("#checkin_subtype").removeAttr('disabled');
    if ($(".ballyhoo_type_selector").val() =='')
    {
      $("#checkin_subtype").prop('disabled', true);
      $("#purchase_subtype").prop('disabled', true);
      $("#task_subtype").prop('disabled', true);
    }
    else
    {
      $("#checkin_subtype").removeAttr('disabled');
      $("#purchase_subtype").removeAttr('disabled');
      $("#task_subtype").removeAttr('disabled');
    }
  });
  if (typeof challenge_setup_modal !== "undefined")
  {
    $('#challenge-setup-modal').modal('show');
  }

  if (typeof employee_msg !== "undefined"){
    $('#flash-popup .modal-body').html("<p>" + employee_msg + "</p> <a href='javascript:;' class='btn btn-primary' onclick= 'hide_modal_popup()'> Okay</a>")
    $('#flash-popup .modal-title').html('Congratulations!')
    $("#flash-popup").modal("show")
  }

  if ((typeof confirmed !== "undefined") && (confirmed !== null)){
    $('#flash-popup .modal-body').html("<p>Your account was successfully confirmed.</p> <a href='javascript:;' class='btn btn-primary' onclick= 'hide_modal_popup()'> Okay</a>");
    $('#flash-popup .modal-title').html('Congratulations!');
    $("#flash-popup").modal("show");
    confirmed = null;
  }

  if(typeof new_establish !== "undefined"){
    $('#flash-popup .modal-body').html("<p>" + new_establish + "</p> <a href='javascript:;' class='btn btn-primary' onclick= 'hide_modal_popup()'> Okay</a>");
    $('#flash-popup .modal-title').html('Congratulations!');
    $("#flash-popup").modal("show");
  }

  if((typeof booster_active !== "undefined") && (booster_active !== null)){
    $('#booster_div').click();
    booster_active = null;
  }

  $('#open_challenge_form').click(function(){
    $('#challenge-accordion-22').click();
  });
}

function hide_modal_popup(){
  $("#flash-popup").modal("hide");
}

function hide_modal_popup_error(){
  $("#error-popup").modal("hide");
}

function booster_form_settings(){
  $('#activation').addClass('hide');
  $('#repeat').addClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').addClass('hide');
  $('#mylim').addClass('hide');
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.checkin_subtype_selector').val('');
  $('.purchase_subtype_selector').val('');
  $('.task_subtype_selector').val('');
  if ($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') 
  {
    $('#Subtype1').removeClass('hide');
    $('#Subtype2').addClass('hide');
    $('#Subtype3').addClass('hide');
  }
  else if ($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') 
  {
    $('#Subtype1').addClass('hide');
    $('#Subtype2').removeClass('hide');
    $('#Subtype3').addClass('hide');
  }
  else if ($(".ballyhoo_type_selector").val() =='TaskBallyhoo') 
  {
    $('#Subtype1').addClass('hide');
    $('#Subtype2').addClass('hide');
    $('#Subtype3').removeClass('hide');
  }
}
function checkin_ballyhoo1(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').removeClass('hide');
  $("#ballyhoo_end_time").prop('required', true);
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').removeClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').show();
  $(".quantity_div").prop('required', true);
  $('.quantity_div_f').show();
  $('.quantity_checkbox').show();
  $(".point-addition").removeAttr('required');
}
function checkin_ballyhoo2(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').addClass('hide');
  $("#ballyhoo_end_time").removeAttr('required');
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').removeClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').show();
  $(".quantity_div").prop('required', true);
  $('.quantity_div_f').show();
  $('.quantity_checkbox').show();
  $(".point-addition").removeAttr('required');
}
function checkin_ballyhoo3(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').addClass('hide');
  $("#ballyhoo_end_time").removeAttr('required');
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").removeClass('hide');
  $('#points').removeClass('hide');
  $('#mylim').addClass('hide');
  $(".limit_div").removeAttr('required');
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').show();
  $(".quantity_div").prop('required', true);
  $('.quantity_div_f').show();
  $('.quantity_checkbox').show();
  $(".point-addition").removeAttr('required');
}
function purchase_ballyhoo1(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').removeClass('hide');
  $("#ballyhoo_end_time").prop('required', true);
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').addClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').removeClass('hide');
  $('#min_item').removeClass('hide');
  $('#type_select').removeClass('hide');
  $('#point_multiplier').removeClass('hide');
  $('#category_product').removeClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').removeClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').hide();
  $(".quantity_div").removeAttr('required');
  $('.quantity_div_f').hide();
  $('.quantity_checkbox').hide();
  $(".point-addition").removeAttr('required');
}
function purchase_ballyhoo2(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').addClass('hide');
  $("#ballyhoo_end_time").removeAttr('required');
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').addClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').removeClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').removeClass('hide');
  $('#point_multiplier').removeClass('hide');
  $('#category_product').removeClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').removeClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').show();
  $(".quantity_div").prop('required', true);
  $('.quantity_div_f').show();
  $('.quantity_checkbox').show();
  $(".point-addition").removeAttr('required');
}
function purchase_ballyhoo3(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').addClass('hide');
  $("#ballyhoo_end_time").removeAttr('required');
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').addClass('hide');
  $('#mylim').addClass('hide');
  $(".limit_div").removeAttr('required');
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').removeClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').hide();
  $(".quantity_div").removeAttr('required');
  $('.quantity_div_f').hide();
  $('.quantity_checkbox').hide();
  $(".point-addition").prop('required', true);
}
function task_ballyhoo1(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').removeClass('hide');
  $("#ballyhoo_end_time").prop('required', true);
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').removeClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').hide();
  $(".quantity_div").removeAttr('required');
  $('.quantity_div_f').hide();
  $('.quantity_checkbox').hide();
  $(".point-addition").removeAttr('required');
}
function task_ballyhoo2(){
  $('#activation').removeClass('hide');
  $('#ballyhoo_end_time').addClass('hide');
  $("#ballyhoo_end_time").removeAttr('required');
  $('#repeat').removeClass('hide');
  $('#audience').addClass('hide');
  $("#friends").addClass('hide');
  $('#points').removeClass('hide');
  $('#mylim').removeClass('hide');
  $(".limit_div").prop('required', true);
  $('#product_category').addClass('hide');
  $('#min_item').addClass('hide');
  $('#type_select').addClass('hide');
  $('#point_multiplier').addClass('hide');
  $('#category_product').addClass('hide');
  $("#min-purchase").addClass('hide');
  $('.point-addition').addClass('hide');
  $('.point-multiplier').addClass('hide');
  $('.category-dropdown').addClass('hide');
  $('.quantity_div').show();
  $(".quantity_div").prop('required', true);
  $('.quantity_div_f').show();
  $('.quantity_checkbox').show();
  $('#ballyhoo_end_time').hide
  $(".point-addition").removeAttr('required');
}

$(document).on('change', '.checkin_subtype_selector', function() {
  if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($(".checkin_subtype_selector").val() =='Time-Limited'))
  { 
    checkin_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($(".checkin_subtype_selector").val() =='Quantity-Limited'))
  {
    checkin_ballyhoo2()
  }
  else if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($(".checkin_subtype_selector").val() =='Social'))
  {
    checkin_ballyhoo3()
  }
});

$(document).on('change', '.purchase_subtype_selector', function() {
  if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($(".purchase_subtype_selector").val() =='Time-Limited'))
  {
    purchase_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($(".purchase_subtype_selector").val() =='Quantity-Limited'))
  {
    purchase_ballyhoo2()
  }
  else if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($(".purchase_subtype_selector").val() =='Minimum Purchase'))
  {
    purchase_ballyhoo3()
  }
});

$(document).on('change', '.task_subtype_selector', function() {
  if (($(".ballyhoo_type_selector").val() =='TaskBallyhoo') && ($(".task_subtype_selector").val() =='Time-Limited'))
  {
    task_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='TaskBallyhoo') && ($(".task_subtype_selector").val() =='Quantity-Limited'))
  {
    task_ballyhoo2()
  }
});

$(document).on('change', '#checkin_subtype', function() {
  if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($("#checkin_subtype").val() =='Time-Limited'))
  { 
    checkin_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($("#checkin_subtype").val() =='Quantity-Limited'))
  {
    checkin_ballyhoo2()
  }
  else if (($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') && ($("#checkin_subtype").val() =='Social'))
  {
    checkin_ballyhoo3()
  }
});
$(document).on('change', '#purchase_subtype', function() {
  if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($("#purchase_subtype").val() =='Time-Limited'))
  { 
    purchase_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($("#purchase_subtype").val() =='Quantity-Limited'))
  {
    purchase_ballyhoo2()
  }
  else if (($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') && ($("#purchase_subtype").val() =='Minimum Purchase'))
  {
    purchase_ballyhoo3()
  }
});
$(document).on('change', '#task_subtype', function() {
  if (($(".ballyhoo_type_selector").val() =='TaskBallyhoo') && ($("#task_subtype").val() =='Time-Limited'))
  { 
    task_ballyhoo1()
  }
  else if (($(".ballyhoo_type_selector").val() =='TaskBallyhoo') && ($("#task_subtype").val() =='Quantity-Limited'))
  {
    task_ballyhoo2()
  }
});

$(document).on('change', '.ballyhoo_type_selector', function() {
  if ($(".ballyhoo_type_selector").val() =='CheckinBallyhoo') 
  {
    $('#checkin_subtype').removeClass('hide');
    $('#purchase_subtype').addClass('hide');
    $('#task_subtype').addClass('hide');
  }
  else if ($(".ballyhoo_type_selector").val() =='PurchaseBallyhoo') 
  {
    $('#checkin_subtype').addClass('hide');
    $('#purchase_subtype').removeClass('hide');
    $('#task_subtype').addClass('hide');
  }
  else if ($(".ballyhoo_type_selector").val() =='TaskBallyhoo') 
  {
    $('#checkin_subtype').addClass('hide');
    $('#purchase_subtype').addClass('hide');
    $('#task_subtype').removeClass('hide');
  }
});


$(document).on('change', '#item_type_product', function() {
  if ($('#item_type_product').prop('checked') == true){
    $('#type_select').show();
    $('.category-dropdown').addClass('hide');
    $('.product-dropdown').removeClass('hide');
    $('.point-addition').addClass('hide');
    $('.point-multiplier').removeClass('hide');
    $(".point-addition").prop('required',false);
  }
});

$(document).on('change', '#item_type_category', function() {
  if ($('#item_type_category').prop('checked') == true){
    $('#type_select').show();
     $('.product-dropdown').addClass('hide');
    $('.category-dropdown').removeClass('hide');
    $('.point-addition').removeClass('hide');
    $('.point-multiplier').addClass('hide');  
    $(".point-addition").prop('required', true);
  }
});


$( document ).on('change', '#quantity', function(){
  if ($(this).is(':checked') == true){
   $('.quantity_div_f').removeClass('hide')
   $('.quantity_div').addClass('hide')
   // $('#total_checkin_qty').val('Unlimited');
  } else if ($(this).is(':checked') == false){
    $('.quantity_div_f').addClass('hide')
    $('.quantity_div').removeClass('hide')
    // $('#total_checkin_qty').val('');
  }
});

$( document ).on('change', '#limit', function(){
  if ($(this).is(':checked') == true){
   $('.limit_div_f').removeClass('hide')
   $('.limit_div').addClass('hide')
   // $('#total_checkin_qty').val('Unlimited');
  } else if ($(this).is(':checked') == false){
    $('.limit_div_f').addClass('hide')
    $('.limit_div').removeClass('hide')
    // $('#total_checkin_qty').val('');
  }
});