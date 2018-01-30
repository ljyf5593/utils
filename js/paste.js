/** 粘贴上传图片 **/
document.body.addEventListener("paste", function(e) {
  var clipboard = e.clipboardData;
  for (var i = 0, len = clipboard.items.length; i < len; i++) {
    if (
      clipboard.items[i].kind == "file" ||
      clipboard.items[i].type.indexOf("image") > -1
    ) {
      var imageFile = clipboard.items[i].getAsFile();
      var form = new FormData();
      form.append("image", imageFile);
      $.ajax({
        url: channel.server + "/u.php?community=" + channel.community,
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        beforeSend: function() {
          $("#uploadmessage").html("正在上传图片...");
        },
        error: function() {
          $("#uploadmessage").html("上传失败请重新上传!");
          setTimeout("$('#uploadmessage').html('')", 1000);
        },
        success: function(url) {
          $("#uploadmessage").html("图片上传成功");
          setTimeout("$('#uploadmessage').html('')", 1000);
          var textarea = $(".textarea");
          textarea.val(textarea.val() + "[![](" + url + ")](" + url + ")");
        }
      });
      e.preventDefault();
    }
  }
});
