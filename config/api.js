//封装所有请求
import http from "@/config/request.js";

export default {
  //获取公告信息
  get_app_info(params) {
    return http.post("api/getNotice", params);
  },
  //登录
  login(params) {
    return http.post("api/login", params);
  },
  // 注册
  register(params) {
    return http.post("api/register", params);
  },
  // 注册邮箱验证码
  code(params) {
	  return http.post("api/sendRegcode", params);
  },
  // 获取关注信息
  followState(params) {
	  return http.post("api/followState", params);
  },
  //获取用户信息
  get_user_information(params) {
    return http.post("api/getUserInfo", params, 2);
  },
  //查询关注列表
  get_follow_list(params) {
    return http.post("api/userFollowList", params, 2);
  },
  //查询粉丝列表
  get_fan_list(params) {
    return http.post("api/userFanList", params, 2);
  },
  //排行榜
  ranking_list(params) {
    return http.post("api/UserList", params);
  },
  //关注取消关注
  follow_users(params) {
    return http.post("api/followUsers", params, 2);
  },
  //获取版块列表
  get_section_list(params) {
    return http.post("api/listSection", params);
  },
  // 获取版块信息
  get_section_information(params) {
    return http.post("api/getSection", params);
  },
  //获取帖子列表
  get_posts_list(params) {
    return http.post("api/listPost", params);
  },
  //获取推荐帖子
  get_recommended_posts(params) {
    return http.post("api/listPost", params);
  },
  //获取帖子信息
  get_post_information(params) {
    return http.post("api/getPost", params, 1);
  },
  //获取帖子评论列表
  get_list_comments(params) {
    return http.post("api/listComment", params);
  },
  //评论帖子
  post_comment(params) {
    return http.post("api/comment", params, 2);
  },
  //点赞取消帖子
  like_posts(params) {
    return http.post("api/thumbs", params, 2);
  },
  // 获取消息通知
  get_message_notifications(params) {
    return http.post("api/getmessagelist", params, 2);
  },
  // 获取未读消息通知
  getunreadMessage(params) {
    return http.post("api/getunreadMessage", params);
  },
  // 修改消息状态
  updatemsgstate(params) {
    return http.post("api/updatemsgstate", params);
  },
  // 上传头像
  uploadhead(params) {
	  return http.post("api/UploadHead", params, 2);
  }
};
