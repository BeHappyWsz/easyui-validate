(function($, undefined) {
	$.fn.validatebox.extensions = {};
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
	var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
	var rules = {	
			zip : {// 验证邮政编码
				validator : function(value) {
					return /^[1-9]\d{5}$/i.test(value);
				},
				message : '邮政编码格式不正确!'
			},
			webUrl : {
				validator : function(value){
					return /^(((https?|ftp):\/\/)|(www\.))(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
				},
				message : '请输入有效的网址!'
			},
			maxLength : { // 判断最大长度
				validator : function(value, param) {
					return value.length < param[0];
				},
				message : '最大长度限制为{0}个字符!'
			},
			fixedLengthRybh : { // 判断最大长度
				validator : function(value, param) {
					return value.length == param[0];
				},
				message : '请输入正确的{0}位人员编号!'
			},
			idcard : {
				validator : function(value) {
					return methods.IdCardValidate(value);
				},
				message : "输入正确的中国身份证格式."
			},
			integer : {
				validator : function(value, param) {
					return /^[+]?[1-9]\d*$/.test(value);
				},
				message : '请输入最小为1的整数'
			},
			mobile : {
				validator : function(value, param) {
					//return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
					return /^[1]\d{10}$/.test(value);
				},
				message : '手机号码不正确'
			},
			tel : {
				validator : function(value) {
					return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
				},
				message : "输入的内容必须是电话号码(中国)格式."
			},
			telOrMobile : {
				validator : function(value, param) {
					//return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
					return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
				},
				message : '输入的内容必须是电话号码(中国)或移动电话号码(中国)格式'
			},
			xydm : {
				validator : function(value, param) {
					return value.length == 18;
				},
				message : '信用代码长度不正确'
			},
			xiaoshu : {
				validator : function(value) {
					return /^\d+(\.\d{1,2})?$/.test(value);
				},
				message : '最大精度保留两位小数！'
			},
			//用户账号验证(只能包括 _ 数字 字母) 
		    account: {//param的值为[]中值
		        validator: function (value, param) {
		            if (value.length < param[0] || value.length > param[1]) {
		                $.fn.validatebox.defaults.rules.account.message = '用户名长度必须在' + param[0] + '至' + param[1] + '范围';
		                return false;
		            } else {
		                if (!/^[\w]+$/.test(value)) {
		                    $.fn.validatebox.defaults.rules.account.message = '用户名只能数字、字母、下划线组成.';
		                    return false;
		                } else {
		                    return true;
		                }
		            }
		        }, message: ''
		    },
		    /**折扣，1-10**/
			zk : {
				validator : function(value, param) {
					return /^(\d(\.\d)?|10)$/.test(value);
				},
				message : '请输入正确的折扣(1.0-10.0)'
			},
			//验证0-100之间的数字
			checknumber:{
				validator:function(value){
					return /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/.test(value);
				},
				message:'输入数字在0-100之间'
			},
			//验证数字是30的倍数
			checkSfZc:{
				validator:function(value){
					return value%30==0 && value.length<=6;
				},
				message:'输入30的倍数,并且内容长度必须介于0到6之间'
			}
		};
	var methods = {
			isNullOrEmpty : function (str) { return str === undefined || str === null || str === ""; },
			isTel : function(str) { return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str); },
			isMobile : function(str) { return /^(13|14|15|17|18)\d{9}$/i.test(str); },
			isShortDate : function(str){
		        str = methods.isNullOrEmpty(str) ? "" : String(str);
		        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		        if (r == null) { return false; }
		        var d = new Date(r[1], r[3] - 1, r[4]);
		        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
			},
			IdCardValidate : function(idCard) {
				idCard = methods.trim(idCard.replace(/ /g, "")); // 去掉字符串头尾空格
				if (idCard.length == 15) {
					return methods.isValidityBrithBy15IdCard(idCard); // 进行15位身份证的验证
				} else if (idCard.length == 18) {
					var a_idCard = idCard.split(""); // 得到身份证数组
					if (methods.isValidityBrithBy18IdCard(idCard) && methods.isTrueValidateCodeBy18IdCard(a_idCard)) { // 进行18位身份证的基本验证和第18位的验证
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			/**
			 * 判断身份证号码为18位时最后的验证位是否正确
			 * @param a_idCard
			 * 身份证号码数组
			 * @return
			 */
			isTrueValidateCodeBy18IdCard : function(a_idCard) {
				var sum = 0; // 声明加权求和变量
				if (a_idCard[17].toLowerCase() == 'x') {
					a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
				}
				for (var i = 0; i < 17; i++) {
					sum += Wi[i] * a_idCard[i]; // 加权求和
				}
				valCodePosition = sum % 11; // 得到验证码所位置
				if (a_idCard[17] == ValideCode[valCodePosition]) {
					return true;
				} else {
					return false;
				}
			},
			/**
			 * 验证18位数身份证号码中的生日是否是有效生日
			 * 
			 * @param idCard
			 * 18位书身份证字符串
			 * @return
			 */
			isValidityBrithBy18IdCard : function(idCard18) {
				var year = idCard18.substring(6, 10);
				var month = idCard18.substring(10, 12);
				var day = idCard18.substring(12, 14);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 这里用getFullYear()获取年份，避免千年虫问题
				if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			},
			/**
			 * 验证15位数身份证号码中的生日是否是有效生日
			 * @param idCard15 15位书身份证字符串
			 * @return
			 */
			isValidityBrithBy15IdCard : function(idCard15) {
				var year = idCard15.substring(6, 8);
				var month = idCard15.substring(8, 10);
				var day = idCard15.substring(10, 12);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
				if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			},
			// 去掉字符串头尾空格
			trim : function(str) {
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}
		};
		
		$.extend($.fn.validatebox.defaults.rules, rules);
		$.extend($.fn.datebox.defaults, { validType:"isDate" });
	
})(jQuery);
