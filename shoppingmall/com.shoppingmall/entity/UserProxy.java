package entity;



import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserProxy  implements InvocationHandler{
	
	
     private Object  obj;
     
     
     public UserProxy(Object obj){
    	
     };
     
     public Object getProxyInstance(Object obj){
    	 this.obj=obj;
    	 return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), this);
     }

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		  
		
		System.out.println(method);
		return method.invoke(obj, args);
	}
     
	
	
	public static void main(String[] args) {
		Userimpl user = new Userimpl("n ini");
		
		Object object = new UserProxy(user).getProxyInstance(user); 
		
		
		
	
	    
	   
 		
		
		 
		
		
	}
	
	

}


class Userimpl implements UserInter{
	
	private  String name;
	Userimpl(String name){
		
		this.name=name;
		
	}
	@Override
	public UserInter getUser() {
		
		return this;
	}
	
	
	
}

interface UserInter{
	
	
	UserInter getUser();
}
