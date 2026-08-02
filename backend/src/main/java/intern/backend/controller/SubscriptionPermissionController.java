package intern.backend.controller;

import intern.backend.entity.SubscriptionPermission;
import intern.backend.service.SubscriptionPermissionService;
import intern.backend.dto.PermissionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://global-ip-portal.netlify.app"
})
public class SubscriptionPermissionController {

    @Autowired
    private SubscriptionPermissionService service;

    @GetMapping
    public List<SubscriptionPermission> getAll() {
        return service.getAll();
    }

    @PostMapping("/update")
    public void update(@RequestBody PermissionRequest req) {
        service.updatePermission(
                req.getPlan().toUpperCase(),
                req.getFeature(),
                req.isEnabled()
        );
    }

    @GetMapping("/{plan}")
    public List<String> getByPlan(@PathVariable String plan) {
        return service.getPermissionsForPlan(plan.toUpperCase());
    }
}
