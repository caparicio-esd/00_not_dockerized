package es.carlos.esd;

import org.apache.zeppelin.helium.Application;
import org.apache.zeppelin.helium.ApplicationContext;
import org.apache.zeppelin.helium.ApplicationException;
import org.apache.zeppelin.helium.ZeppelinApplicationDevServer;
import org.apache.zeppelin.resource.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AppTesting extends Application {
    private final Logger logger = LoggerFactory.getLogger(AppTesting.class);

    public AppTesting(ApplicationContext context) {
        super(context);
    }

    @Override
    public void run(ResourceSet resources) throws ApplicationException {
 
    }
    @Override
    public void unload() throws ApplicationException {

    }
    

    /**
     * Development mode
     */
    public static void main(String[] args) throws Exception {
        LocalResourcePool pool = new LocalResourcePool("dev");
        pool.put("date", new Date());

        ZeppelinApplicationDevServer devServer = new ZeppelinApplicationDevServer(
            AppTesting.class.getName(),
            pool.getAll()
        );

        devServer.start();
        devServer.join();
    }
}
