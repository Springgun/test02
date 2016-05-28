package entity;



/*
 * @谭
 *   
 *  用户     
          
 *  
 *  
 */

/*  CREATE TABLE USER(

id INT(20) NOT NULL AUTO_INCREMENT,
userName VARCHAR(100)  DEFAULT NULL,
pwd VARCHAR(255)  DEFAULT NULL,
nickName VARCHAR(100) DEFAULT NULL,
number_Type INT(2) DEFAULT NULL,
PRIMARY KEY(id)
)   

*/
public class User { 
	
	private int id;
	private String userName;
	private String pwd;
	private String nickname;
	private int numberType ; //卖家1 买家 2
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getNumberType() {
		return numberType;
	}
	public void setNumberType(int numberType) {
		this.numberType = numberType;
	}
	public User() {
		super();
		
	}
	@Override
	public String toString() {
		return "User [userName=" + userName + ", pwd=" + pwd + ", nickname=" + nickname + ", numberType=" + numberType
				+ "]";
	}
	
	
	
	
	
	

}
