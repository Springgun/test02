package shoppingmall;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.TreeMap;
import java.util.TreeSet;

import org.junit.Test;


public class TestMall {
		private static  String str;
		
		  TestMall(){    //构造器不能使用synchronized
		
		 };

	   public  static  void getTestMall(TestMall t ){

	   }
	   
	   
	   
	public  void test02(){
		TestMall testMall = new TestMall();
		
		TreeSet<Integer> hash;  
		
	
		
		
		
		
		
		
	    
	
		
	}
	 
	
}

class myThread implements  Runnable{
	int number=0;
	
	
	public synchronized void run(int number){
		
		
	}

	@Override
	public void run() {
		run(number);
		
	}
}