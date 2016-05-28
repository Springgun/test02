package entity;

import java.util.Date;

public class Product {
	
	private String productName;
	
	private String productType;
	
	private String productPicture;
	
	private Date  overTime;
	
	private String describe;
	
	private int productid;
	
	private User user;

	public Product() {
		super();
	
	}

	@Override
	public String toString() {
		return "Product [productName=" + productName + ", productType=" + productType + ", productPicture="
				+ productPicture + ", overTime=" + overTime + ", describe=" + describe + ", productid=" + productid
				+ ", user=" + user + "]";
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getProductPicture() {
		return productPicture;
	}

	public void setProductPicture(String productPicture) {
		this.productPicture = productPicture;
	}

	public Date getOverTime() {
		return overTime;
	}

	public void setOverTime(Date overTime) {
		this.overTime = overTime;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public int getProductid() {
		return productid;
	}

	public void setProductid(int productid) {
		this.productid = productid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
	

}
