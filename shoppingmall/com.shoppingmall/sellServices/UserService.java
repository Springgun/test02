package sellServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entity.User;
import sellMapping.UserMapper;

@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	@Transactional(readOnly=true)
	public  User getUserByName(String userName, String pwd) {
		
		User user=userMapper.getUserByName(userName);
		
		if(user !=null && user.getPwd().equals(pwd)){
			return user;
		}
		
		return null;
	}
	
	


}
