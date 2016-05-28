package product;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/product")
public class ProductHandler {
	@RequestMapping(value="up",method=RequestMethod.GET)
	public String up(){
		return null;
	}

}
