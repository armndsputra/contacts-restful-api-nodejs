import { logger } from "./app/logging.js";
import { web } from "./app/web.js"; 

// application first entry point
web.listen(3000, () => {
	logger.info("Server is running on port 3000");
});
