package user;


import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import entity.User;
import sellServices.UserService;


@Controller
@RequestMapping(value="/user")
public class UserHandler {
	
	
	
	public UserHandler() {
		super();
		System.out.println("UserHandler");
	}

	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(@RequestParam("userName") String userName,
			@Param("pwd")String pwd ,HttpSession session,RedirectAttributes redirect){
		
		User user=userService.getUserByName(userName,pwd);
		if(user !=null){
			session.setAttribute("user", user);
			
							
			return  "user_home";
		}
		
		redirect.addFlashAttribute("notUserError", "账号或密码错误,请重新登入");
		return "redirect:/login";
		
		
	}

}
