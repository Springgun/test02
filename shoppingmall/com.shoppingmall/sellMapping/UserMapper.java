package sellMapping;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;

import entity.User;



public interface UserMapper {

	User getUserByName(@Param("userName")String userName);
	
	

}
